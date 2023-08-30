async function createUser(client, userName, flat) {
  try {
    console.log("in create user");
    let db = await client.db("resourceBooking");
    let users = await db.collection("users");
    const result = await users.insertOne({ name: userName, flat: flat });
    if (result.insertedId) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = { createUser };
