const fs = require("fs");
const path = require("path");
const Groq = require("groq-sdk");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./schema/UserSchema");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

async function getResponse(userMessage, model, chatHistory,temperatureValue) {
  try {
    const messages = chatHistory
      .map((message) => ({ role: message.role, content: message.content }))
      .concat({ role: "user", content: userMessage });

    // Debugging: Log messages to verify the structure
    console.log("Message being sent to Groq API:",temperatureValue, messages);
    const chatCompletion = await getGroqResponse(messages, model,temperatureValue);
    const assistantResponse = {
      role: "assistant",
      content: chatCompletion.choices[0]?.message?.content || "",
    };

    return assistantResponse.content;
  } catch (error) {
    console.error("Error getting response:", error);
    throw error;
  }
}

async function getGroqResponse(messages, model,temperatureValue) {
  for (const message of messages) {
    if (!message.role || !message.content) {
      throw new Error(`Invalid message structure: ${JSON.stringify(message)}`);
    }
  }

  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "you are a helpful AI assistant. Always answer using html tags."
      },
      ...messages,
    ],
    model: model || "llama3-8b-8192",
    temperature: temperatureValue,
  });
}

app.post("/api/chat", async (req, res) => {
  const { message, model, username,temperatureValue } = req.body;
  console.log("req body:", req.body);
  if (!message || !username) {
    return res.status(400).send({ error: "Message and Username are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const assistantResponse = await getResponse(message, model, user.chatHistory,parseFloat(temperatureValue));
    user.chatHistory.push(
      { role: "user", content: message },
      { role: "assistant", content: assistantResponse }
    );
    await user.save();

    res.send({ response: assistantResponse });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.patch("/api/clear", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send({ error: "Username is required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    let emptyChatHistory = [];
    user.chatHistory = emptyChatHistory;
    await user.save();

    res.send({ response: "Chat history cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

app.get("/", (req, res) => {
  res.send("zync's server is up and running!");
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
