$(document).ready(function() {
  //Helper functions

  //Render Tweets Function Starts here..
  const renderCart = items => {
    console.log('renderCart');
    for (let item of items) {
      // console.log(item);
      const $item = createCartElement(item);
      $('#cart').append($item);
    }
  };

  // Function to ensure  text is safe
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //dynamically create html elements
  const createCartElement = item => {
    const cartPage = $(`
    <section class="card">
      <div class="items">
        <span>
          <span class="quantity"><i class="fas fa-plus"></i> ${item.quantity} <i class="fas fa-minus"></i></span>
          <span class="text-left">${item.name}</span>
        </span>
        <span class="price text-right">$${(item.price/100).toFixed(2)}</span>
      </div>
    </section>
    `);
    console.log(cartPage);
    return cartPage;
  };

  // Load tweets by getting array of tweets from /tweets
  const loadCart = () => {
    $.ajax('api/cart', { method: 'GET' })
      .then((data) => renderCart(data));
  };

  // Upon document loading, load cart
  loadCart();
});
