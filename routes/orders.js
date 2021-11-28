/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
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
