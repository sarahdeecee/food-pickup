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
          Order #${data.id} - ${timeago.format(data.order_timestamp)}
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
              <button type="button" class="btn btn-primary">Mark as Completed</button>
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
      console.log(order);
    }
  };

  const loadOrders = () => {
    $.ajax('/api/orders/queue', { method: 'GET' })
      .then((data) => renderQueue(data));
  };

  loadOrders();
  // refresh queue every 5 seconds
  setInterval(loadOrders, 5000);
});
