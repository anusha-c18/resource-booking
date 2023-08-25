const express = require("express");
const recordsRoute = require("./api/routes/records-rt"); //importing routes
const app = express();
app.use(express.json());
const cors = require("cors");
const oAuth = require("./middleware/oAuth");
const mongo = require("./db/mongoUtil");
const allowedOrigins = [
  "https://resource-booking-frontend.vercel.app",
  "http://localhost:5173",
];

app.use(cors({ origin: allowedOrigins }));

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
