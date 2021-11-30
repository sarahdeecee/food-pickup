const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET: /cart
  const orderNumber = 1;
  router.get("/", (req, res) => {
    db.query(`
      SELECT * FROM food_items
      JOIN order_foods on food_id = food_items.id
      WHERE order_foods.order_id = ${orderNumber}
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
