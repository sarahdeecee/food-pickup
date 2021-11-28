/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // router.get("/", (req, res) => {
  //   let query = `SELECT * FROM widgets`;
  //   console.log(query);
  //   db.query(query)
  //     .then((data) => {
  //       const widgets = data.rows;
  //       res.json({ widgets });
  //     })
  //     .catch((err) => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  router.post("/", (req, res) => {
    const ordersQuery = `
      INSERT INTO orders (customer_id, subtotal, tax)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [req.body.user_id, req.body.subtotal, req.body.tax];
    console.log(req.body.items);

    db.query(ordersQuery, values)
      .then((res) => console.log(res.rows))
      .catch((err) => {
        console.log('query error:', err.message);
      });

    const orderfoodsQuery = `
      INSERT INTO order_foods (order_id, food_id)
      VALUES ();
    `;

  });
  return router;
};
