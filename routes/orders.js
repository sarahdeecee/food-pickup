/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const query = `
      INSERT INTO orders (customer_id, subtotal, tax)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [req.body.user_id, req.body.subtotal, req.body.tax];

    db.query(query, values)
      .then((res) => {
        console.log(res.rows[0]);
        insertOrderFoods(res.rows[0].id, req.body.items);
      })
      .catch((err) => {
        console.log('query error:', err.message);
      });
  });

  const insertOrderFoods = (orderId, foodIds) => {
    const query = `
      INSERT INTO order_foods (order_id, food_id)
      VALUES ($1, $2);
    `;

    for (const foodId of foodIds) {
      const values = [orderId, foodId];
      db.query(query, values)
        .catch((err) => {
          console.log('query error:', err.message);
        });
    }
  };
  return router;
};
