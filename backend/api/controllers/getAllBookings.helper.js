const mongoUtil = require("../../db/mongoUtil");

async function getAllBookings() {
  console.log("getting all bookings");
  try {
    const client = mongoUtil.client;
    let db = await client.db("resourceBooking");
    let bookings = await db.collection("bookings");
    let allBookings = await bookings.find({}).toArray();
    return allBookings;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getAllBookings };
