/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const sms = require("./sendSms.js");
let format = require('pg-format');

module.exports = (db) => {
  // GET: /api/orders/queue
  // Gets the queue of orders
  // Returns: JSON response
  router.get("/api/orders/queue", (req, res) => {
    const query = `
      SELECT orders.id, users.name as customer, order_timestamp, progress, array_agg(food_items.name) as items
      FROM orders
      JOIN order_foods ON orders.id = order_foods.order_id
      JOIN food_items ON order_foods.food_id = food_items.id
      JOIN users ON orders.customer_id = users.id
      WHERE progress NOT LIKE 'Completed'
      GROUP BY orders.id, users.name
      ORDER BY order_timestamp
    `;

    db.query(query)
      .then((data) => {
        data.rows.forEach((row) => {
          row.items = countItems(row.items);
        });

        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  });

  // GET: /api/orders/[id]
  // Gets an order by id
  // Returns: JSON response
  router.get("/api/orders/:orderId", (req, res) => {
    const query = `
      SELECT orders.*, array_agg(food_items.name) as items
      FROM orders
      JOIN order_foods ON orders.id = order_foods.order_id
      JOIN food_items ON order_foods.food_id = food_items.id
      WHERE orders.id = $1
      GROUP BY orders.id
    `;
    const values = [req.params.orderId];

    db.query(query, values)
      .then((data) => {
        // check if order doesn't exist
        if (data.rows.length === 0) {
          return res.status(404).send();
        }

        data.rows[0].items = countItems(data.rows[0].items);
        res.status(200).send(data.rows[0]);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  });

  // GET: /api/orders/user/[id]
  // Get all orders from a user
  router.get("/orders/user/:userId", (req, res) => {
    const query = `
      SELECT orders.*, users.name as customer, progress, array_agg(food_items.name) as items
      FROM orders
      JOIN order_foods ON orders.id = order_foods.order_id
      JOIN food_items ON order_foods.food_id = food_items.id
      JOIN users ON orders.customer_id = users.id
      WHERE orders.customer_id = $1
      GROUP BY orders.id, users.name
      ORDER BY order_timestamp
    `;
    const values = [req.params.userId];

    db.query(query, values)
      .then((data) => {
        data.rows.forEach((row) => {
          row.items = countItems(row.items);
        });
        const templateVars = { rows: data.rows };
        console.log(templateVars);
        res.render("user_order", templateVars);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  });

  // POST: /api/orders
  // Submits an order
  // Returns: JSON response
  router.post("/api/orders", (req, res) => {
    const query = `
      INSERT INTO orders (customer_id, subtotal, tax)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    //console.log(req.body);
    const values = [req.session.user_id, req.body.subtotal, req.body.tax];

    db.query(query, values)
      .then((data) => {
        insertOrderFoods(data.rows[0].id, req.body.cart, res);
      })
      .catch((err) => {
        console.log("query error:", err.message);
        res.status(400).send(err.message);
      });
  });

  const insertOrderFoods = (orderId, cart, res) => {

    let myNestedArray = [];
    for (let item of cart) {
      myNestedArray.push([orderId , item.id]);
    }
    let query = format('INSERT INTO order_foods (order_id, food_id) VALUES %L', myNestedArray);
    console.log(query);

    db.query(query)
      .then((data) => {
        res.status(200).send();
      })
      .catch((err) => {
        console.log("query error:", err.stack);
        res.status(400).send(err.message);
      });

  };

  // PUT: /api/orders/edit/[id]
  // Edit order progress
  // Returns: JSON response
  router.put("/api/orders/edit/:orderId", (req, res) => {
    const query = `
      UPDATE orders
      SET progress = $1
      WHERE id = $2
      RETURNING *
    `;
    const values = [req.body.progress, req.params.orderId];

    db.query(query, values)
      .then((data) => {
        if (req.body.progress === "Ready") {
          sms.sendSms(data.rows[0].customer_id, db);
        }
        res.status(200).send(data.rows[0]);
      })
      .catch((err) => {
        res.status(400).send(err.message);
        console.log(err.message);
      });
  });

  // count each item in the array
  const countItems = (items) => {
    const counts = {};
    items.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });

    return counts;
  };

  // GET: /api/orders/time/[id]
  // Gets total order preparation time for a given order
  // Returns: JSON response
  router.get("/api/orders/time/:orderId", (req, res) => {
    const query = `
      SELECT order_foods.order_id,SUM(food_items.prep_time) as total_order_time
      FROM order_foods
      INNER JOIN food_items ON order_foods.food_id = food_items.id
      WHERE order_foods.order_id = $1
      GROUP BY order_foods.order_id;
    `;
    const values = [req.params.orderId];

    db.query(query, values)
      .then((data) => {
        // check if order doesn't exist
        if (data.rows.length === 0) {
          return res.status(404).send();
        }
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  });

  router.get("/orders/queue", (req, res) => {
    res.render("queue");
  });

  // POST: /api/:orderId/:itemId/delete
  // Remove Item for a given order
  router.post("/api/:orderId/:itemId/delete", (req, res) => {
    const query = `
      DELETE FROM order_foods
      WHERE order_id = $1 AND food_id = $2;
    `;
    const { orderId, itemId } = req.params;

    db.query(query, [orderId, itemId])
      .then((data) => {
        res.redirect("/cart");
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  });

  return router;
};
