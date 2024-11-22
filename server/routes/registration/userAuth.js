const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../../schema/UserSchema.js");


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Email and password is required!" });
  }
  try {
    const user = await User.findOne({
      email,
      password,
    });
    if (user) {
      const user_id = user._id;
      const token = jwt.sign({ email, user_id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).send({ token });
    } else {
      return res.status(401).send({ error: "Invalid email or password" });
    }
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
