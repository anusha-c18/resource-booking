const mongoUtil = require("../../db/mongoUtil");

async function getUniqueResources() {
  const client = mongoUtil.client;
  let db = await client.db("resourceBooking");
  let allResources = await db.collection("allResources").find({}).toArray();
  let uniqueResources = [];
  allResources.map((x) => {
    if (!uniqueResources.includes(x.resource)) uniqueResources.push(x.resource);
    // console.log(x.resource + " check");
  });
  console.log(uniqueResources);
  return uniqueResources;
}

module.exports = { getUniqueResources };
