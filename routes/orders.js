/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET: /orders/queue
  // Gets the queue of orders
  router.get("/queue", (req, res) => {
    const query = `
      SELECT orders.id, customer_id, order_timestamp, progress, array_agg(food_items.name) as items
      FROM orders
      JOIN order_foods ON orders.id = order_foods.order_id
      JOIN food_items ON order_foods.food_id = food_items.id
      WHERE progress NOT LIKE 'Completed'
      GROUP BY orders.id
      ORDER BY order_timestamp
    `;

    db.query(query)
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  });

  // GET: /orders/[id]
  router.get("/:orderId", (req, res) => {
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
        res.status(200).send(data.rows[0]);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  });

  // POST: /orders
  // Submits an order
  router.post("/", (req, res) => {
    const query = `
      INSERT INTO orders (customer_id, subtotal, tax)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [req.body.user_id, req.body.subtotal, req.body.tax];

    db.query(query, values)
      .then((data) => {
        console.log(data.rows);
        insertOrderFoods(data.rows[0].id, req.body.items, res);
      })
      .catch((err) => {
        console.log('query error:', err.message);
        res.status(400).send(err.message);
      });
  });

  const insertOrderFoods = (orderId, foodIds, res) => {
    const query = `
      INSERT INTO order_foods (order_id, food_id)
      VALUES ($1, $2);
    `;

    for (const foodId of foodIds) {
      const values = [orderId, foodId];
      db.query(query, values)
        .then((data) => {
          res.status(200).send();
        })
        .catch((err) => {
          console.log('query error:', err.message);
          res.status(400).send(err.message);
        });
    }
  };

  // PUT: /orders/[id]
  // Edit order progress
  router.put("/:orderId", (req, res) => {
    const query = `
      UPDATE orders
      SET progress = $1
      WHERE id = $2
    `;
    const values = [req.body.progress, req.params.orderId];

    db.query(query, values)
      .then((data) => {
        res.status(200).send(data.rows[0]);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  });

  return router;
};
