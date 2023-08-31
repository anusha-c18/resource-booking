async function deleteResource(resource, client) {
  try {
    const db = client.db("resourceBooking");
    const collection = db.collection("allResources");
    const result = await collection.deleteMany({
      ["resource"]: resource,
    });
    return result.deletedCount;
  } catch (err) {
    return result.deletedCount;
  }
}

module.exports = { deleteResource };
