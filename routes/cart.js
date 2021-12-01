const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET: /cart
  router.get("/", (req, res) => {
    const {cart} = req.session;
    res.render("cart", { cart });
  });

  // POST: /cart
  router.post("/", (req, res) => {
    const cart = req.body.cartItems;
    req.session.cart = cart;
    res.render("cart", { cart });
  });

  return router;
};
