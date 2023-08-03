const express = require("express");
const router = express.Router();
const controller = require("../controllers/main.controller");

router.get("/", (req, res) => {
  res.send("we are in records router");
});

router.route("/allResources").get(controller.getAllResources);

router.route("/allBookings").get(controller.getAllBookings);

router.route("/availableResources").get(controller.availableResources);

router.route("/insertBooking").post(controller.insertBooking);

router
  .route("/uniqueAvailableResources")
  .get(controller.uniqueAvailableResources);

router.route("/uniqueResources").get(controller.uniqueResourcesbooked);

module.exports = router;
