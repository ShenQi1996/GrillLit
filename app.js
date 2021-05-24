const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const app = express();
const User = require('./models/User');
const users = require('./routes/api/users');
const bodyParser = require('body-parser');



mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  const user = new User({
    email: "testing@email",
    password: "123456"
  });
  debugger
  user.save()
  debugger
  res.send("Hello World");
});

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/api/users", users);

app.listen(port, () => console.log(`Server is running on port ${port}`));
