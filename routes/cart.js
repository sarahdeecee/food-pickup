const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET: /cart
  router.get("/cart", (req, res) => {
    const {cart} = req.session;
    res.render("cart", { cart });
  });

  // GET: /api/cart
  router.get("/api/cart", (req, res) => {
    const { cart } = req.session;
    console.log(cart);
    res.send(cart);
  });

  // POST: /cart
  router.post("/cart", (req, res) => {
    const cart = req.body.cartItems;
    req.session.cart = cart;
    res.render("cart", { cart });
  });

  // DELETE: /api/cart/clear
  router.delete("/api/cart/clear", (req, res) => {
    req.session.cart = [];
  });

  return router;
};
