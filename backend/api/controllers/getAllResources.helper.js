const mongoUtil = require("../../db/mongoUtil");

async function getAllResources() {
  console.log("getting all resources");
  try {
    const client = mongoUtil.client;
    let db = await client.db("resourceBooking");
    let resources = await db.collection("allResources");
    let allResources = await resources.find({}).toArray();
    return allResources;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getAllResources };
