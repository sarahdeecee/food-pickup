const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET: /cart
  router.get("/", (req, res) => {
    const orderNumber = 1;
    db.query(`
      SELECT food_items.*, count(food_items.id) as quantity
      FROM food_items
      JOIN order_foods on food_id = food_items.id
      WHERE order_foods.order_id = ${orderNumber}
      GROUP BY food_items.id
    ;`)
      .then((data) => {
        const cart = data.rows;
        const templateVars = { cart };
        res.render("cart", templateVars);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;

};
