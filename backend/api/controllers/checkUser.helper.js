async function checkUser(client, userName) {
  try {
    let db = await client.db("resourceBooking");
    let users = await db.collection("users");
    let userWithName = await users.find({ name: userName }).toArray();
    console.log("looking up for the name: ", userWithName);
    if (userWithName.length == 0) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = { checkUser };
