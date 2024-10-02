const express = require("express");
const routes = express.Router();
const userRoute = require("./user.route");
const admin = require("./admin.route");
const booking = require("./booking.route");
const property = require("./property.route");

routes.use("/user", userRoute);
routes.use("/admin", admin)
routes.use("/booking", booking)
routes.use("/property", property)

module.exports = routes;
