const userRoute = require("./user");
const eventsRoute = require("./events");
const authRoute = require("./auth");
const organizerRoute = require("./organizer");

module.exports = [authRoute, eventsRoute, userRoute, organizerRoute];
