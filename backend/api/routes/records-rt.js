const express = require("express");
const router = express.Router();
const controller = require("../controllers/main.controller");
const { requiredScopes } = require("express-oauth2-jwt-bearer");
const { auth } = require("express-oauth2-jwt-bearer");

const checkScopes = requiredScopes("read:admin");

const checkJwt = auth({
  issuerBaseURL: process.env.AUTH0_BASE_URL,
  audience: process.env.AUTH0_AUDIENCE,
  algorithm: ["RS256"],
});

router.get("/", (req, res) => {
  res.send("we are in records router");
});

router.route("/allResources").get(checkJwt, controller.getAllResources);

router.route("/allBookings").get(checkJwt, controller.getAllBookings);

router
  .route("/availableResources")
  .get(checkJwt, controller.availableResources);

router.route("/insertBooking").post(checkJwt, controller.insertBooking);

router
  .route("/uniqueAvailableResources")
  .get(checkJwt, controller.uniqueAvailableResources);

router
  .route("/uniqueResourcesBooked")
  .get(checkJwt, controller.uniqueResourcesBooked);

router
  .route("/uniqueExistingResources")
  .get(checkJwt, controller.uniqueExistingResources);

router
  .route("/createNewResource")
  .post(checkJwt, checkScopes, controller.createNewResource);

router
  .route("/deleteResource/:resource")
  .get(checkJwt, checkScopes, controller.deleteResource);

router
  .route("/deleteBookings/:resource")
  .get(checkJwt, checkScopes, controller.deleteBookings);

router.route("/getUserBookings/:name").get(checkJwt, controller.userBookings);

module.exports = router;
