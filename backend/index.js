const express = require("express");
const recordsRoute = require("./api/routes/records-rt"); //importing routes
const app = express();
app.use(express.json());
const cors = require("cors");
const oAuth = require("./middleware/oAuth");
const mongo = require("./db/mongoUtil");

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://resource-booking-frontend.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use(oAuth);

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
