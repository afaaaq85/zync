const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../../schema/UserSchema.js");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Email and password is required!" });
  }
  console.log(email, password);
  const findUser = await User.findOne({ email });
  console.log("email found:", findUser);
  try {
    const user = await User.findOne({
      email,
     
    });
    if(!user){
      return res.status(401).send({ error: "User not found" });
    }
    const isMatch =  await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Incorrect password" });
    }
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Some error occurred while signing in!" });
  }
});

router.post("/signup", async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;
  if (!first_name || !last_name || !username || !email || !password) {
    return res.status(400).send({ error: "All fields are required" });
  }

  try {
    const user = await User.create({
      first_name,
      last_name,
      username,
      email,
      password,
    });

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Some error occurred while creating user" });
  }
});

module.exports = router;
