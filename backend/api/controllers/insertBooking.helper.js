async function insertBooking(client, booking) {
  console.log("getting all resources");
  try {
    let db = await client.db("resourceBooking");
    let bookings = await db.collection("bookings");
    const result = await bookings.insertOne(booking);
    if (result.insertedId) {
      console.log("Document inserted successfully:", result.insertedId);
      let allResources = await db.collection("allResources");
      const result = await db.allResources.updateOne(
        {
          resource: booking.resource,
          startTime: booking.startTime,
          endTime: booking.endTime,
        },
        { $set: { available: "0" } }
      );
      if (result.modifiedCount === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("Document insertion failed.");
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { insertBooking };
