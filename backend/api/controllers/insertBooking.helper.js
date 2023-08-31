async function insertBooking(client, booking) {
  try {
    let db = await client.db("resourceBooking");
    let bookings = await db.collection("bookings");
    const result = await bookings.insertOne(booking);
    if (result.insertedId) {
      let allResources = await db.collection("allResources");
      const result1 = await allResources.updateOne(
        {
          resource: booking.resource,
          startTime: booking.startTime,
          endTime: booking.endTime,
        },
        { $set: { available: "0" } }
      );
      if (result1.modifiedCount === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

module.exports = { insertBooking };
