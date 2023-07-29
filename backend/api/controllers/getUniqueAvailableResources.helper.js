const mongoUtil = require("../../db/mongoUtil");

async function getUniqueAvailableResources() {
  const client = mongoUtil.client;
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
  console.log(uniqueAvailableResources);
  return uniqueAvailableResources;
}

module.exports = { getUniqueAvailableResources };
