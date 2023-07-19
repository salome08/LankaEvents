module.exports = function (app) {
  const eventEmitter = app.get("eventEmitter");

  /* For ex — Suppose in a new user registration API, we may want to send welcome email,
   so instead of waiting for email to be sent and then sending response of register api, 
   we can simply use node js events where on new registration we will fire signup event 
   and send the response of register API.*/
  // This event will fire when users logged in, we can execute task
  // like sending welcome notification or SMS and this will not interfere the main API
  eventEmitter.on("login", function (data) {
    console.log("User logged in " + data);

    // code to send welcome email

    // code to send welcome sms

    // code to login time in third party analytics
  });
};
