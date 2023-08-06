function getAllResourcesGenerator(client) {
  return async () => {
    console.log("getting all resources");
    try {
      let db = await client.db("resourceBooking");
      let resources = await db.collection("allResources");
      let allResources = await resources.find({}).toArray();
      return allResources;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = { getAllResourcesGenerator };
