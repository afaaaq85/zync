require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Groq = require("groq-sdk");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require('./routes/registration/userAuth');
const chatRouter = require('./routes/groq/chat');
const clearRouter = require('./routes/groq/clear');
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use('/user', userRouter);
app.use('/api', chatRouter);
app.use('/api', clearRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running -> http://localhost:${process.env.PORT}`);
});
