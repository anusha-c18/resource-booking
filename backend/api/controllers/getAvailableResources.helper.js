const mongoUtil = require("../../db/mongoUtil");

async function getAvailableResources() {
  const client = mongoUtil.client;
  let db = await client.db("resourceBooking");
  let availableResources = await db
    .collection("allResources")
    .find({ ["available"]: "1" })
    .toArray();
  console.log(availableResources);
  return availableResources;
}

module.exports = { getAvailableResources };
