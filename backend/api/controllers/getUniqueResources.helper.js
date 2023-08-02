const mongoUtil = require("../../db/mongoUtil");

async function getUniqueResources() {
  const client = mongoUtil.client;
  let resources = await client.db("resourceBooking");
  let allResources = await resources.find({}).toArray();
  let uniqueResources = [];
  allResources.map((x) => {
    if (!uniqueResources.includes(x.resource)) uniqueResources.push(x.resource);
  });
  console.log(uniqueResources);
  return uniqueResources;
}

module.exports = { getUniqueResources };
