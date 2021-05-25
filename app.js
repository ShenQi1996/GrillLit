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


// app.use(passport.initialize());
// require('./config/passport')(passport);



app.get("/", (req, res) => {
  // const user = new User({
  //   email: "testing@email",
  //   password: "123456"
  // });
  // user.save();
});

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


app.use("/api/users", users);

app.listen(port, () => console.log(`Server is running on port ${port}`));
