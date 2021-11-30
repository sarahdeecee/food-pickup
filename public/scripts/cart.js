$(document).ready(() => {
  const renderCart = items => {
    for (let item of items) {
      const $tweet = createCartElement(item);
      $('#cart').append($tweet);
    };
  }
  const renderTotals = items => {
    let total = 0;
    const taxRate = 1.13;
    for (let item of items) {
      total +=  item.price;
    };
    let tax = total * taxRate;
    $('footer').prepend($totals);
  }
  const createCartElement = currentOrderObj => {
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

};

