async function insertBooking(client, booking) {
  console.log("getting all resources");
  try {
    let db = await client.db("resourceBooking");
    let bookings = await db.collection("bookings");
    const result = await bookings.insertOne(booking);
    if (result.insertedId) {
      console.log("Document inserted successfully:", result.insertedId);
      return true;
    } else {
      console.log("Document insertion failed.");
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { insertBooking };
