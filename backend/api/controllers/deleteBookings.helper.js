async function deleteBookings(resource, client) {
  try {
    const db = client.db("resourceBooking");
    const collection = db.collection("bookings");
    const result = await collection.deleteMany({
      ["resource"]: resource,
    });
    return result.deletedCount;
  } catch (err) {
    return result.deletedCount;
  }
}

module.exports = { deleteBookings };
