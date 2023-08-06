async function getAvailableResources(client) {
  let db = await client.db("resourceBooking");
  let availableResources = await db
    .collection("allResources")
    .find({ ["available"]: "1" })
    .toArray();
  return availableResources;
}

module.exports = { getAvailableResources };
