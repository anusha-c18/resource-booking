async function createResource(resource, client) {
  function deepClone(obj) {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => deepClone(item));
    }

    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  try {
    let document = {};
    const db = await client.db("resourceBooking");
    let collection = await db.collection("allResources");
    document.resource = resource.resource;
    document.date = resource.date;
    document.available = "1";
    const start = resource.startTime;
    const end = resource.endTime;
    let resourceSlots = [];
    for (let i = parseInt(start); i < parseInt(end); i++) {
      document.startTime = i + "";
      document.endTime = i + 1 + "";
      const clonedDoc = deepClone(document);
      resourceSlots.push(clonedDoc);
    }
    try {
      const result = await collection.insertMany(resourceSlots);
      if (result.insertedCount === resourceSlots.length) {
        return "Documents inserted successfully";
      } else {
        return "Documents insertion failed.";
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { createResource };
