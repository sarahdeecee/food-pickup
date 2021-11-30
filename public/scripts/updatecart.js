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
    // console.log(item);
    const cartPage = $(`
    <section>
      <div>
        <span>${item.quantity} ${item.name}</span>
        <span class="price">$${(item.price/100).toFixed(2)}</span>
      </div>
    </section>
    `);
    return cartPage;
  };

  // Load tweets by getting array of tweets from /tweets
  const loadCart = () => {
    $.ajax('/cart', { method: 'GET' })
      .then(cartHTML => {
        console.log(cartHTML);
        $('#cart').empty();
        renderCart(cartHTML);
      })
      .catch(err => console.error(err.message));
    // $('#error').empty();
    // $('#error').hide();
    // $('.new-tweet').hide();
  };

  //Create new Tweet that is called within the Submit Button
  // const addNewTweet = function(event) {
  //   const $tweetText = $(event.target.text).serialize();
  //   $.post('/tweets', $tweetText).then(() => {
  //     $('#tweet-text').val(''); //clears textarea
  //     loadTweets();
  //   });
  // };

  // Upon document loading, load all tweets
  loadCart();
});
