const mongoUtil = require("../../db/mongoUtil");

async function getUniqueResourcesBooked() {
  const client = mongoUtil.client;
  let db = await client.db("resourceBooking");
  let allResources = await db.collection("bookings").find({}).toArray();
  let uniqueResources = [];
  allResources.map((x) => {
    if (!uniqueResources.includes(x.resource)) uniqueResources.push(x.resource);
    // console.log(x.resource + " check");
  });
  console.log(uniqueResources);
  return uniqueResources;
}

module.exports = { getUniqueResourcesBooked };
