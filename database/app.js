const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

mongoose.connect("mongodb+srv://lekhanhtoan07:T14012003oan@server1.h0nl7gl.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/signup/signup.html");
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      password: hashedPassword
    });

    await newUser.save();
    res.redirect("/success");
  } catch (err) {
    res.redirect("/error");
  }
});

app.get("/success", (req, res) => {
  res.send("Registration successful!");
});

app.get("/error", (req, res) => {
  res.send("Error in registration.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const fullName = req.body.fullName;
  const email = req.body.email;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      password: hashedPassword,
      fullName: fullName,
      email: email,
     
    });

    await newUser.save();
    res.redirect("/success");
  } catch (err) {
    res.redirect("/error");
  }
});
