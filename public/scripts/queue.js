$(document).ready(() => {
  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createOrderElement = (data) => {
    let items = ``;
    for (const item in data.items) {
      items = items.concat(`<li>${item}: ${data.items[item]}</li>`);
    }

    const html = `
      <div class="card">
        <div class="card-header">
          Order #<span id="order-id">${data.id}</span> - ${timeago.format(data.order_timestamp)}
        </div>
        <div class="card-body">
          <p>Customer: ${escape(data.customer)}</p>
          <ul>
            ${items}
          </ul>
          <div class="row justify-content-between">
            <div class="col-4">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="progress-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  ${escape(data.progress)}
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Pending</a></li>
                  <li><a class="dropdown-item" href="#">Preparing</a></li>
                  <li><a class="dropdown-item" href="#">Ready</a></li>
                </ul>
              </div>
            </div>
            <div class="col-4">
              <button type="button" class="btn btn-primary" id="mark-complete">Mark as Completed</button>
            </div>
          </div>
        </div>
      </div>
    `;

    return html;
  };

  const renderQueue = (orders) => {
    $('.queue-container').empty();
    for (const order of orders) {
      const $tweet = createOrderElement(order);
      $('.queue-container').append($tweet);
    }

    // progress dropdown behavior
    $('.dropdown-item').click(function() {
      const $button = $(this).closest(".dropdown").children("button");
      $button.text($(this).text());

      // set put request
      const orderId = $(this).closest(".card").find("#order-id").text();
      console.log($(this).text());
      $.ajax(`/api/orders/edit/${orderId}`, {
        method: "PUT",
        contentType: 'application/json',
        data: JSON.stringify({ "progress": $(this).text() }),
      });
    });

    // complete button behaviour
    $('#mark-complete').click(function() {
      const orderId = $(this).closest(".card").find("#order-id").text();
      $.ajax(`/api/orders/edit/${orderId}`, {
        method: "PUT",
        contentType: 'application/json',
        data: JSON.stringify({ "progress": "Completed" }),
        success: loadOrders
      });
    });
  };

  const loadOrders = () => {
    $.ajax('/api/orders/queue', { method: 'GET' })
      .then((data) => renderQueue(data));
  };

  loadOrders();
  // refresh queue every 7 seconds
  setInterval(loadOrders, 7000);
});
