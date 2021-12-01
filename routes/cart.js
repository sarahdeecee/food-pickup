const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET: /cart
  router.get("/api/cart", (req, res) => {
    console.log('-----> get api/cart/');
    // const values = [req.params.orderId];
    const values = [1];
    console.log(values);
    const query = `
      SELECT food_items.*, count(food_items.id) as quantity
      FROM food_items
      JOIN order_foods on food_id = food_items.id
      WHERE order_foods.order_id = 1
      GROUP BY food_items.id
    ;`;
    db.query(query, values)
    .then((data) => {
      console.log(data);
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
      // .then((data) => {
      //   console.log(data.rows);
      //   const cart = data.rows;
      //   const templateVars = { cart };
      //   res.render("cart", templateVars);
      // })
      // .catch((err) => {
      //   res
      //     .status(500)
      //     .json({ error: err.message });
      // });
  });

  router.get("/", (req, res) => {
    console.log("-----> get /");
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
