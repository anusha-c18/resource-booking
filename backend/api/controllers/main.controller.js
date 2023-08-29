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
const deleteResource = require("./deleteResource.helper");
const deleteBookings = require("./deleteBookings.helper");
const mongoUtil = require("../../db/mongoUtil");
const getUserBookings = require("./userBookings.helper");
const checkUser = require("./checkUser.helper");
const createUser = require("./createUser.helper");
const client = mongoUtil.client;

module.exports.checkUser = async function (req, res) {
  try {
    const userName = req.params.name;
    console.log("checking if user exists");
    const exists = await checkUser.checkUser(client, userName);
    console.log("user exists?", exists);
    if (exists) {
      res.status(200).send([true]);
    } else {
      res.status(200).send([false]);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.createUser = async function (req, res) {
  try {
    const userName = req.params.name;
    const flat = req.params.flat;
    const results = createUser.createUser(client, userName, flat);
    if (!results) {
      res.status(500).send(["Could not enter details. Please try again!"]);
    } else {
      res.status(200).send(["Entered details successfully!"]);
    }
  } catch (err) {
    console.loog(err);
  }
};

module.exports.getAllResources = async function (req, res) {
  try {
    console.log("in get all resources of the main controller");
    const resources = await getResources.getAllResources(client);
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
    const bookings = await getBookings.getAllBookings(client);
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
      await getAvailableResources.getAvailableResources(client);
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
      await getUniqueExistingResources.getUniqueExistingResources(client);
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
      await getUniqueAvailableResources.getUniqueAvailableResources(client);
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
      await getUniqueResourcesBooked.getUniqueResourcesBooked(client);
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
    const result = await createResource.createResource(resource, client);
    if (result == "Documents inserted successfully") {
      res.status(200).send(["Resource created successfully!"]);
    } else {
      res.status(500).send(["Resource creation failed. Please try again!"]);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteResource = async function (req, res) {
  try {
    const resource = req.params.resource;
    console.log(resource);
    const deleteCount = await deleteResource.deleteResource(resource, client);
    if (deleteCount == 0) {
      res.status(500).send(["Resource deletion failed. Please try again!"]);
    } else {
      res.status(200).send(["Resource deleted successfully!"]);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteBookings = async function (req, res) {
  try {
    const resource = req.params.resource;
    console.log(resource);
    const deleteCount = await deleteBookings.deleteBookings(resource, client);
    if (deleteCount == 0) {
      res
        .status(500)
        .send(["Resource's bookings deletion failed. Please try again!"]);
    } else {
      res.status(200).send(["Resource's bookings deleted successfully!"]);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.userBookings = async function (req, res) {
  try {
    const name = req.params.name;
    const bookings = await getUserBookings.getUserBookings(client, name);
    if (bookings.length == 0) res.status(200).send(["No bookings found :("]);
    else res.status(200).send(bookings);
  } catch (err) {
    console.log(err);
  }
};
