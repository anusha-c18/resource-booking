const express = require("express");
const app = express();
app.use(express.json());
const getResources = require("./getAllResources.helper");
const getBookings = require("./getAllBookings.helper");
const getAvailableResources = require("./getAvailableResources.helper");
const getUniqueAvailableResources = require("./getUniqueAvailableResources.helper");
const insertBooking = require("./insertBooking.helper");
const getUniqueResourcesBooked = require("./getUniqueResourcesBooked.helper");
const getUniqueExistingResources = require("./getUniqueExistingResources.helper");
const createResource = require("./createNewResource.helper");

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

module.exports.uniqueExistingResources = async function (req, res) {
  try {
    const uniqueExistingResources =
      await getUniqueExistingResources.getUniqueExistingResources();
    if (uniqueExistingResources.length == 0) {
      res.status(200).send(["No resources exist."]);
    } else {
      res.status(200).send(uniqueExistingResources);
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

module.exports.uniqueResourcesBooked = async function (req, res) {
  try {
    const uniqueResources =
      await getUniqueResourcesBooked.getUniqueResourcesBooked();
    if (uniqueResources.length == 0) {
      res.status(200).send(["No resources booked."]);
    } else {
      res.status(200).send(uniqueResources);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.insertBooking = async function (req, res) {
  try {
    const booking = req.body.booking;
    let document = {
      resource: booking.resource + "",
      flat: booking.flat + "",
      name: booking.name + "",
      startTime: booking.startTime + "",
      endTime: booking.endTime + "",
      bookingTimeStamp: booking.bookingTimeStamp + "",
    };
    // const result = await insertBooking.insertBooking(document);
    // if (result == -1) {
    //   res.status(500).send("Failed to book the resource");
    // } else {
    //   res.status(200).send("Booking confirmed!");
    // }
  } catch (err) {
    console.log(err);
  }
};

module.exports.createNewResource = async function (req, res) {
  try {
    const resource = req.body;
    const result = await createResource.createResource(resource);
    if (result == "Documents inserted successfully") {
      res.status(200).send(["Resource created successfully"]);
    } else {
      res.status(500).send(["Resource creation failed. Please try again!"]);
    }
  } catch (err) {
    console.log(err);
  }
};
