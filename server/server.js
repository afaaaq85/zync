"use strict";
const fs = require("fs");
const path = require("path");
const Groq = require("groq-sdk");
const express = require("express");
const app = express();
const port = process.env.PORT;
require("dotenv").config();
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const historyFilePath = path.join(__dirname, "conversationHistory.json");

function loadConversationHistory() {
  if (fs.existsSync(historyFilePath)) {
    const data = fs.readFileSync(historyFilePath, "utf8");
    return JSON.parse(data);
  }
  return [];
}

function saveConversationHistory(history) {
  fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), "utf8");
}

async function getResponse(userMessage, model) {
  const conversationHistory = loadConversationHistory();
  conversationHistory.push({
    role: "user",
    content: userMessage,
  });

  const chatCompletion = await getChatFromModel(conversationHistory, model);
  const assistantResponse = {
    role: "assistant",
    content: chatCompletion.choices[0]?.message?.content || "",
  };
  conversationHistory.push(assistantResponse);
  saveConversationHistory(conversationHistory);

  return assistantResponse.content;
}

async function getChatFromModel(messages, model) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a helpful AI Assistant. Always reply using html tags.`,
      },
      ...messages,
    ],
    model: model || "llama3-8b-8192",
  });
}

app.post("/api/chat", async (req, res) => {
  const { message, model } = req.body;
  if (!message) {
    return res.status(400).send({ error: "Message is required" });
  }
  try {
    const response = await getResponse(message, model);
    res.send({ response });
    console.log(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/api/clear", (req, res) => {
  try {
    saveConversationHistory([]);
    res.send({ message: "Conversation history cleared." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running...`);
});

module.exports = {
  getResponse,
  getChatFromModel,
};
