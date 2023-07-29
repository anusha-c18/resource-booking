const express = require("express");
const router = express.Router();
const controller = require("../controllers/main.controller");

router.get("/", (req, res) => {
  res.send("we are in records router");
});

router.route("/allResources").get(controller.getAllResources);

module.exports = router;
