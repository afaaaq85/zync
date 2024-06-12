const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../../schema/UserSchema");
const { getResponse } = require("../../utils/chatUtils"); // Move your utility functions here

router.post("/chat", async (req, res) => {
  const { message, model, temperatureValue } = req.body;
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!message) {
    return res.status(400).send({ error: "Message is required" });
  }
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { user_id } = decoded;
   
    const user = await User.findById({ _id: user_id });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const assistantResponse = await getResponse(
      message,
      model,
      user.chatHistory,
      parseFloat(temperatureValue)
    );
    user.chatHistory.push(
      { role: "user", content: message },
      { role: "assistant", content: assistantResponse }
    );
    await user.save();

    res.send({ response: assistantResponse });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
