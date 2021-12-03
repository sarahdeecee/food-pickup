$(document).ready(function() {
  const sendSMS = function() {
    let orderId = Number($.trim($(`#send-sms-id`).text().replace(/\r?\n|\r/g, " ")));
    let waitToTime = Number($.trim($(`#time-to-send-sms`).text().replace(/\r?\n|\r/g, " "))) * 1000;
    console.log(orderId,waitToTime);
    setTimeout(function() {
      $.ajax(`/api/orders/edit/${orderId}`, {
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({ "progress": "Ready" }),
        success: () => {
        },
      });
    }, waitToTime);
  };
  sendSMS();
});
