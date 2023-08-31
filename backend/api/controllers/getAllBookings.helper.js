async function getAllBookings(client) {
  try {
    let db = await client.db("resourceBooking");
    let bookings = await db.collection("bookings");
    let allBookings = await bookings.find({}).toArray();
    return allBookings;
  } catch (err) {
    return [];
  }
}

module.exports = { getAllBookings };
