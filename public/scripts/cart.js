// Client facing scripts here
$(document).ready(function() {
  let cartCount = 0;
  let cartItems = [];

  const loadCart = function() {
    $.ajax(`/api/cart`, {
      method: "GET",
      contentType: "application/json",
      success: (data) => {
        cartItems = data;
        cartCount = data.length;
        $("#cartcount").text(cartCount);
      },
    });
  };
  loadCart();

  const createItemAndAddToCart = function(value) {
    let itemName = $.trim(
      $(`#item-title-${value}`)
        .text()
        .replace(/\r?\n|\r/g, " ")
    );
    let itemPrice = $.trim(
      $(`#item-price-${value}`)
        .text()
        .replace(/\r?\n|\r/g, " ")
        .replace(/[^0-9]/g, "")
    );
    let itemId = $.trim(
      $(`#item-id-${value}`)
        .text()
        .replace(/\r?\n|\r/g, " ")
        .replace(/[^0-9]/g, "")
    );
    cartItems.push({
      id: itemId,
      name: itemName,
      price: itemPrice,
      quantity: 1,
    });
  };

  const createCartElement = (item) => {
    const cartPage = $(`
      <section class="card">
        <div class="items card-body">
          <span>
            <span class="quantity">
              ${item.quantity}
            </span>
            <span class="text-left">
              ${item.name}
            </span>
          </span>
          <span class="price text-right">$${item.price}.00</span>
        </div>
      </section>
    `);
    return cartPage;
  };

  const renderCart = (items) => {
    $("#cartbody").empty();
    for (let item of items) {
      let $item = createCartElement(item);
      $("#cartbody").append($item);
    }
  };

  const showCartModal = function(cartItems) {
    renderCart(cartItems);
    $("#cart").modal("show");
  };
  $("#cart").on("show.bs.modal", function(event) {
    let totalsObj = calcTotals(cartItems);
    $(this).find("#subtotal").text((totalsObj.subtotal).toLocaleString("en-US", {style:"currency", currency:"USD"}));
    $(this).find("#tax").text((totalsObj.tax).toLocaleString("en-US", {style:"currency", currency:"USD"}));
    $(this).find("#total").text((totalsObj.total).toLocaleString("en-US", {style:"currency", currency:"USD"}));
  });

  $(".add-to-cart").click(function(event) {
    event.preventDefault();
    cartCount++;
    createItemAndAddToCart($(this).val());
    $("#cartcount").text(cartCount);
  });

  $("#showcart").click(function(event) {
    event.preventDefault();

    $.cookie("cartItems", JSON.stringify(cartItems));

    $.ajax(`/cart`, {
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ cartItems }),
    });
    showCartModal(cartItems);

  });

  $("#clearcart").click(function(event) {
    event.preventDefault();
    $.ajax(`/api/cart/clear`, {
      method: "DELETE",
    });
    cartItems.length = 0;
    cartCount = 0;
    $("#cartcount").text(0);
    $("#cartbody").empty();

    let totalsObj = {subtotal: 0, tax: 0, total: 0};
    $(this).find("#subtotal").text((totalsObj.subtotal).toLocaleString("en-US", {style:"currency", currency:"USD"}));
    $(this).find("#tax").text((totalsObj.tax).toLocaleString("en-US", {style:"currency", currency:"USD"}));
    $(this).find("#total").text((totalsObj.total).toLocaleString("en-US", {style:"currency", currency:"USD"}));
  });

  $("#checkout").click(function(event) {
    let cart = JSON.parse($.cookie("cartItems"));
    let totalsObj = calcTotals(cart);
    let subtotal = totalsObj.subtotal;
    let tax = totalsObj.subtotal;

    $.ajax(`/api/orders`, {
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ cart, tax, subtotal }),
      success: (data) => {
        const {orderId} = data;
        $(location).attr("href", `/api/${orderId}/confirm`);
      },
    });
  });

  const calcTotals = function(cartItems) {
    const totalObj = {};
    let sum = 0;
    for (let item of cartItems) {
      sum += item.price * item.quantity;
    }
    totalObj.subtotal = sum;
    totalObj.tax = (sum * 0.13);
    totalObj.total = (sum * 1.13);
    return totalObj;
  };
});
