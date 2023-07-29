const express = require("express");
const app = express();
app.use(express.json());
const getResources = require("./getAllResources.helper");
const getBookings = require("./getAllBookings.helper");
const getAvailableResources = require("./getAvailableResources.helper");
const getUniqueAvailableResources = require("./getUniqueAvailableResources.helper");

module.exports.getAllResources = async function (req, res) {
  try {
    const resources = await getResources.getAllResources();
    if (resources.length == 0) {
      res.status(200).send(["No resources exist."]);
    } else {
      res.status(200).send(resources);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllBookings = async function (req, res) {
  try {
    const bookings = await getBookings.getAllBookings();
    if (bookings.length == 0) {
      res.status(200).send(["No bookings exist."]);
    } else {
      res.status(200).send(bookings);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.availableResources = async function (req, res) {
  try {
    const availableResources =
      await getAvailableResources.getAvailableResources();
    if (availableResources.length == 0) {
      res.status(200).send(["No resources available."]);
    } else {
      res.status(200).send(availableResources);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.uniqueAvailableResources = async function (req, res) {
  try {
    const uniqueAvailableResources =
      await getUniqueAvailableResources.getUniqueAvailableResources();
    if (uniqueAvailableResources.length == 0) {
      res.status(200).send(["All resources are booked."]);
    } else {
      res.status(200).send(uniqueAvailableResources);
    }
  } catch (err) {
    console.log(err);
  }
};
