const express = require("express");
const router = express.Router();
const controller = require("../controllers/main.controller");
const { requiredScopes } = require("express-oauth2-jwt-bearer");
const { auth } = require("express-oauth2-jwt-bearer");
const requireAuth = require("../../middleware/requireAuth");

const checkScopes = requiredScopes("read:admin");

const checkJwt = auth({
  issuerBaseURL: process.env.AUTH0_BASE_URL,
  audience: process.env.AUTH0_AUDIENCE,
  algorithm: ["RS256"],
  jwks_uri: "https://dev-1k4isffw1z8aw3io.us.auth0.com/.well-known/jwks.json",
});

// router.use(requireAuth);

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

router.route("/uniqueResourcesBooked").get(controller.uniqueResourcesBooked);

router
  .route("/uniqueExistingResources")
  .get(controller.uniqueExistingResources);

router.route("/createNewResource").post(controller.createNewResource);

router.route("/deleteResource/:resource").get(controller.deleteResource);

router.route("/deleteBookings/:resource").get(controller.deleteBookings);

router.route("/getUserBookings/:name").get(controller.userBookings);

router.route("/checkUser/:name").get(controller.checkUser);

router.route("/createUser/:name/:flat").get(controller.createUser);

router.route("/getFlat/:name").get(controller.getFlat);

module.exports = router;
