const express = require("express");
const recordsRoute = require("./api/routes/records-rt"); //importing routes
const app = express();
app.use(express.json());
const cors = require("cors");
const mongo = require("./db/mongoUtil");
app.use(cors({ origin: "https://resource-booking-frontend.vercel.app" }));
const { auth } = require("express-oauth2-jwt-bearer");
const jwtCheck = auth({
  audience: "https://resource-booking-api.vercel.app/",
  issuerBaseURL: "https://dev-1k4isffw1z8aw3io.us.auth0.com/",
  tokenSigningAlg: "RS256",
});
app.use(jwtCheck);
app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});
// const getAccessToken;

// async function

//Middleware functions to use those routes
app.use("/api/routes/records-rt", recordsRoute);

//Routes
app.get("/", (req, res) => {
  res.send("Welcome home");
});

//starting the process of listening to the server
let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
