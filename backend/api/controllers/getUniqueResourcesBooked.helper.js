async function getUniqueResourcesBooked(client) {
  let db = await client.db("resourceBooking");
  let allResources = await db.collection("bookings").find({}).toArray();
  let uniqueResources = [];
  allResources.map((x) => {
    if (!uniqueResources.includes(x.resource)) uniqueResources.push(x.resource);
  });
  return uniqueResources;
}

module.exports = { getUniqueResourcesBooked };
