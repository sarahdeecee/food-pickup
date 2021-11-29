const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET: /menu
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM food_items;`)
      .then((data) => {
        const foodItems = data.rows;
        console.log(foodItems);
        const templateVars = { foodItems };
        res.render("menu", templateVars);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
