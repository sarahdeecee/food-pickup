// Client facing scripts here
$(() => {

  /**
   * Entered tweet is converted to HTML and returned.
   * @param {String} str
   * @returns HTML
   */
  let cartCount = 0;

  $(".btn.btn-secondary.add-to-cart").click(function(event) {
    event.preventDefault();
    ++cartCount;
    console.log(cartCount);
    $("#cartcount").text(cartCount);
  });

});
