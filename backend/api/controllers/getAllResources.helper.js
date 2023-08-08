async function getAllResources(client) {
  console.log("getting all resources");
  try {
    let db = await client.db("resourceBooking");
    let resources = await db.collection("allResources");
    let allResources = await resources.find({}).toArray();
    console.log(allResources);
    console.log(allResources.length);
    return allResources;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getAllResources };
