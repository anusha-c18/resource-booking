const mongoUtil = require("../../db/mongoUtil");

async function deleteResource(resource) {
  try {
    const client = mongoUtil.client;
    const db = client.db("resourceBooking");
    const collection = db.collection("allResources");
    const result = await collection.deleteMany({
      ["resource"]: resource,
    });
    console.log(`${result.deletedCount} documents deleted.`);
    return result.deletedCount;
  } catch (err) {
    console.log(err);
    return result.deletedCount;
  }
}

module.exports = { deleteResource };
