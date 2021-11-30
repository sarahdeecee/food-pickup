/*
 * All routes for menu are defined here
 * Since this file is loaded in server.js into api/menu,
 *   these routes are mounted onto /menu
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET: /menu
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM food_items;`)
      .then((data) => {
        const foodItems = data.rows;
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
