const mongoUtil = require("./../../db/mongoUtil");

async function insertBooking(booking) {
  console.log("getting all resources");
  try {
    const client = mongoUtil.client;
    let db = await client.db("resourceBooking");
    let resources = await db.collection("allResources");
    const result = await collection.insertOne(booking);
    if (result.insertedCount === 1) {
      console.log("Document inserted successfully:", result.insertedId);
      return result.insertId;
    } else {
      console.log("Document insertion failed.");
      return -1;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { insertBooking };
