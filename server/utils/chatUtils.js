const Groq = require('groq-sdk');
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function getResponse(userMessage, model, chatHistory, temperatureValue) {
  try {
    const messages = chatHistory
      .map((message) => ({ role: message.role, content: message.content }))
      .concat({ role: 'user', content: userMessage });

    console.log('Message being sent to Groq API:', temperatureValue, messages);
    const chatCompletion = await getGroqResponse(messages, model, temperatureValue);
    const assistantResponse = {
      role: 'assistant',
      content: chatCompletion.choices[0]?.message?.content || '',
    };

    return assistantResponse.content;
  } catch (error) {
    console.error('Error getting response:', error);
    throw error;
  }
}

async function getGroqResponse(messages, model, temperatureValue) {
  for (const message of messages) {
    if (!message.role || !message.content) {
      throw new Error(`Invalid message structure: ${JSON.stringify(message)}`);
    }
  }

  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'you are a helpful AI assistant.',
      },
      ...messages,
    ],
    model: model || 'llama3-8b-8192',
    temperature: temperatureValue,
  });
}

module.exports = {
  getResponse,
};
