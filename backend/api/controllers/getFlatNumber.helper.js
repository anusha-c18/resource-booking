async function getFlat(client, name) {
  try {
    let db = await client.db("resourceBooking");
    let users = await db.collection("users");
    let flat = await users.find({ name: name }).toArray();
    return flat[0].flat;
  } catch (err) {
    return null;
  }
}

module.exports = { getFlat };
