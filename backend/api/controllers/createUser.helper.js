async function createUser(client, userName, flat) {
  try {
    let users = await client.db("resouuceBooking").collection("users");
    users.insertOne({ name: userName, flat: flat }, function (err, result) {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = createUser;
