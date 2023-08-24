const express = require("express");
const router = express.Router();
const controller = require("../controllers/main.controller");
const { requiredScopes } = require("express-oauth2-jwt-bearer");
const { auth } = require("express-oauth2-jwt-bearer");

const checkScopes = requiredScopes("read:admin");

console.log("scope : ", checkScopes);

const checkJwt = auth({
  audience: "https://resource-booking-api.vercel.app",
  issuerBaseURL: `https://dev-1k4isffw1z8aw3io.us.auth0.com/`,
});

router.get("/", (req, res) => {
  res.send("we are in records router");
});

router.route("/allResources").get(controller.getAllResources, checkJwt);

router.route("/allBookings").get(controller.getAllBookings, checkJwt);

router
  .route("/availableResources")
  .get(controller.availableResources, checkJwt);

router.route("/insertBooking").post(controller.insertBooking, checkJwt);

router
  .route("/uniqueAvailableResources", checkJwt)
  .get(controller.uniqueAvailableResources, checkJwt);

router
  .route("/uniqueResourcesBooked")
  .get(controller.uniqueResourcesBooked, checkJwt);

router
  .route("/uniqueExistingResources")
  .get(controller.uniqueExistingResources, checkJwt);

router
  .route("/createNewResource")
  .post(controller.createNewResource, checkJwt, checkScopes);

router
  .route("/deleteResource/:resource")
  .get(controller.deleteResource, checkJwt, checkScopes);

router
  .route("/deleteBookings/:resource")
  .get(controller.deleteBookings, checkJwt, checkScopes);

router.route("/getUserBookings/:name").get(controller.userBookings, checkJwt);

module.exports = router;
