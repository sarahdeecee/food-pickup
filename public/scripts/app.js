// Client facing scripts here
$(() => {

  let cartCount = 0;
  let cartItems = [];

  const createItemAndAddToCart = function(value) {
    let itemName = $.trim($(`#item-title-${value}`).text().replace(/\r?\n|\r/g, " "));
    let itemPrice = $.trim($(`#item-price-${value}`).text().replace(/\r?\n|\r/g, " ").replace(/[^0-9]/g,''));
    cartItems.push({"name":itemName, "price":itemPrice, "quantity": 1});
  };

  $(".btn.btn-secondary.add-to-cart").click(function(event) {
    event.preventDefault();
    ++cartCount;
    createItemAndAddToCart($(this).val());
    $("#cartcount").text(cartCount);
  });

  $("#showcart").click(function(event) {
    event.preventDefault();
    $.cookie('cartItems', JSON.stringify(cartItems));

    $.ajax(`/cart`, {
      method: "POST",
      contentType: 'application/json',
      data: JSON.stringify({ "cartItems": cartItems }),
    });

  });

  $("#clearcart").click(function(event) {
    event.preventDefault();
    cartCount = 0;
    cartItems = [];
    $.cookie('cartItems', JSON.stringify(cartItems));
    $("#cartcount").text(cartCount);
  });

});
