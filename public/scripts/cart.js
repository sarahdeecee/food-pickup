$(document).ready(() => {
  const renderCart = items => {
    for (let item of items) {
      const $item = createCartElement(item);
      $('#cart').append($item);
    };
  }
  const renderTotals = items => {
    const subtotal = calcTotal(items);
    const taxRate = 1.13;
    const tax = total * taxRate;
    const total = subtotal + tax;

    $('footer').prepend(`
    Subtotal: ${subtotal}, Tax: ${tax}, Total: ${total}
    `);
  }
  const calcTotal = items => {
    let total = 0;
    for (let item of items) {
      total +=  item.price;
    };
    return total;
  }
  const createCartElement = currentItemObj => {
    const cartPage = $(`
      <div class="items">
        <span class="item">
          <img class="food" src="${item.picture_url}">
          <span class="foodtext">
            <span class="foodname">${item.name}</span><span class="fooddescription">${item.description}</span>
          </span>
        </span>
        <span class="price">${item.price}</span>
      </div>
    `);
    return cartPage;
  };

  // Render cart upon loading page
  renderCart();
  // Render total upon loading page
  renderTotals();

};

