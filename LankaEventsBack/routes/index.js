const userRoute = require("./user");
const eventsRoute = require("./events");
const authRoute = require("./auth");

module.exports = [authRoute, eventsRoute, userRoute];
