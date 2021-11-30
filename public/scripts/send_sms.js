
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Your order is now ready for pick up at Todai Restaurant.',
     from: process.env.TWILIO_PHONE, //Twilio phone number
     to: '+1' //enter number to send message to
   })
  .then(message => console.log(message.sid))
  .catch(err => console.error(err.message));
