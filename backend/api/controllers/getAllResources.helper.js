async function getAllResources(client) {
  try {
    let db = await client.db("resourceBooking");
    let resources = await db.collection("allResources");
    let allResources = await resources.find({}).toArray();
    return allResources;
  } catch (err) {
    return [];
  }
}

module.exports = { getAllResources };
