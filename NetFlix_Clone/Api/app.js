const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

const app = express();
// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.DB_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/auth", authRoute);
app.use("/api/movies", movieRoute);
app.use("/api/users", userRoute);
app.use("/api/lists", listRoute);
app.listen(8800, () => {
  console.log("server is running on port 8800");
});

// https://www.youtube.com/watch?v=tsNswx0nRKM
// https://cloud.mongodb.com/v2/646f27b2113e4c48440e3e95#/clusters
