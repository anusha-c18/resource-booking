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
const createNewUser = require("./createUser.helper");
const checkUser = require("./checkUser.helper");
const getFlat = require("./getFlatNumber.helper");
const client = mongoUtil.client;

module.exports.createUser = async function (req, res) {
  try {
    const userName = req.params.name;
    const flat = req.params.flat;
    const results = await createNewUser.createUser(client, userName, flat);
    if (results) {
      res.status(200).send(["Entered details successfully!"]);
    } else {
      res.status(500).send(["Could not enter details. Please try again!"]);
    }
  } catch (err) {
    res.status(500).send(["Could not enter details. Please try again!"]);
  }
};

module.exports.checkUser = async function (req, res) {
  try {
    const userName = req.params.name;
    const exists = await checkUser.checkUser(client, userName);
    if (exists) {
      res.status(200).send([true]);
    } else {
      res.status(200).send([false]);
    }
  } catch (err) {
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
  }
};

module.exports.getFlat = async function (req, res) {
  try {
    const userName = req.params.name;
    const flat = await getFlat.getFlat(client, userName);
    if (flat) {
      res.status(200).send([flat]);
    } else {
      res.status(404).send(["Error, user doesn't exist!"]);
    }
  } catch (err) {
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
  }
};

module.exports.getAllResources = async function (req, res) {
  try {
    const resources = await getResources.getAllResources(client);
    if (resources.length == 0) {
      res.status(200).send(["No resources exist."]);
    } else {
      res.status(200).send(resources);
    }
  } catch (err) {
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
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
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
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
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
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
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
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
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
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
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
  }
};

module.exports.insertBooking = async function (req, res) {
  try {
    const booking = req.body;
    const result = await insertBooking.insertBooking(client, booking);
    if (result) {
      res.status(200).send(["Booking Confirmed!"]);
    } else {
      res.status(500).send(["Failed to book resource. Please try again!"]);
    }
  } catch (err) {
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
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
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
  }
};

module.exports.deleteResource = async function (req, res) {
  try {
    const resource = req.params.resource;
    const deleteCount = await deleteResource.deleteResource(resource, client);
    if (deleteCount == 0) {
      res.status(500).send(["Resource deletion failed. Please try again!"]);
    } else {
      res.status(200).send(["Resource deleted successfully!"]);
    }
  } catch (err) {
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
  }
};

module.exports.deleteBookings = async function (req, res) {
  try {
    const resource = req.params.resource;
    const deleteCount = await deleteBookings.deleteBookings(resource, client);
    if (deleteCount == 0) {
      res
        .status(500)
        .send(["Resource's bookings deletion failed. Please try again!"]);
    } else {
      res.status(200).send(["Resource's bookings deleted successfully!"]);
    }
  } catch (err) {
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
  }
};

module.exports.userBookings = async function (req, res) {
  try {
    const name = req.params.name;
    const bookings = await getUserBookings.getUserBookings(client, name);
    if (bookings.length == 0) res.status(200).send(["No bookings found :("]);
    else res.status(200).send(bookings);
  } catch (err) {
    res
      .status(500)
      .send(["Internal Server Error. Please try again in a while."]);
  }
};
