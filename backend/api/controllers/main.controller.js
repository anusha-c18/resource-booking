const express = require("express");
const app = express();
app.use(express.json());
const getResources = require("./getAllResources.helper");

module.exports.getAllResources = async function (req, res) {
  try {
    const resources = await getResources.getAllResources();
    if (resources.length == 0) {
      res.status(200).send(["No Resources Exist."]);
    } else {
      res.status(200).send(resources);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllBookings = async function (req, res) {};
