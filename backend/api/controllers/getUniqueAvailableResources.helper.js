async function getUniqueAvailableResources(client) {
  let db = await client.db("resourceBooking");
  let availableResources = await db
    .collection("allResources")
    .find({ ["available"]: "1" })
    .toArray();
  let uniqueAvailableResources = [];
  availableResources.map((x) => {
    if (!uniqueAvailableResources.includes(x.resource))
      uniqueAvailableResources.push(x.resource);
  });
  return uniqueAvailableResources;
}

module.exports = { getUniqueAvailableResources };
