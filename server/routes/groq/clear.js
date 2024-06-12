const express = require("express");
const router = express.Router();
const User = require("../../schema/UserSchema");
const jwt = require("jsonwebtoken");

router.patch("/clear", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { user_id } = decoded;
    const user = await User.findById({
      _id: user_id
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    user.chatHistory = [];
    await user.save();

    res.send({ response: "Chat history cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

module.exports = router;
