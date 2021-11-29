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
      SELECT orders.id, customer_id, order_timestamp, progress, array_agg(food_id) as items
      FROM orders
      JOIN order_foods ON orders.id = order_foods.order_id
      WHERE progress NOT LIKE 'Completed'
      GROUP BY orders.id
      ORDER BY order_timestamp
    `;
    const values = [];

    db.query(query, values)
      .then((dbres) => {
        res.status(200).send(dbres.rows);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  });

  // GET: /orders/[id]
  router.get("/:orderId", (req, res) => {
    const query = `
      SELECT orders.*, array_agg(food_id) as items
      FROM orders
      JOIN order_foods ON orders.id = order_foods.order_id
      WHERE orders.id = $1
      GROUP BY orders.id
    `;
    const values = [req.params.orderId];

    db.query(query, values)
      .then((dbres) => {
        res.status(200).send(dbres.rows[0]);
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
      .then((dbres) => {
        console.log(dbres.rows);
        insertOrderFoods(dbres.rows[0].id, req.body.items, res);
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
        .then((dbres) => {
          res.status(200).send();
        })
        .catch((err) => {
          console.log('query error:', err.message);
          res.status(400).send(err.message);
        });
    }
  };

  return router;
};
