async function deleteResource(resource, client) {
  try {
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
