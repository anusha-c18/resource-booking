async function getUserBookings(client, name) {
  try {
    const db = client.db("resourceBooking");
    const collection = db.collection("bookings");
    const bookings = await collection
      .find({
        ["name"]: name,
      })
      .toArray();
    console.log(`${bookings.length} bookings found.`);
    return bookings;
  } catch (err) {
    console.log(err);
    return -1;
  }
}

module.exports = { getUserBookings };
