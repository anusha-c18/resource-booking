const express = require("express");
const recordsRoute = require("./api/routes/records-rt"); //importing routes
const app = express();
app.use(express.json());
const cors = require("cors");
const mongo = require("./db/mongoUtil");
app.use(cors({ origin: "http://localhost:5173" }));

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
