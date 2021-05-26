const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const app = express();
const User = require("./models/User");
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const Event = require("./models/Event");
const events = require("./routes/api/events");

const path = require("path");

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// app.use(passport.initialize());
// require('./config/passport')(passport);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  // const user = new User({
  //   email: "testing@email",
  //   password: "123456"
  // });
  // user.save();
});

const port = process.env.PORT || 5000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/api/users", users);

app.use("/api/events", events);

app.listen(port, () => console.log(`Server is running on port ${port}`));
