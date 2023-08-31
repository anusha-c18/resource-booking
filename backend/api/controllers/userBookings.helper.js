async function getUserBookings(client, name) {
  try {
    const db = client.db("resourceBooking");
    const collection = db.collection("bookings");
    const bookings = await collection
      .find({
        ["name"]: name,
      })
      .toArray();
    return bookings;
  } catch (err) {
    return -1;
  }
}

module.exports = { getUserBookings };
