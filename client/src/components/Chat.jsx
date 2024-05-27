import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Lottie from "lottie-react";
import TypingAnimation from "../assets/anim/typing.json";
import DOMPurify from "dompurify";

function Chat({ isOpen }) {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [model, setModel] = useState("llama3-8b-8192");
  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_API_URL;

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/api/chat`, {
        message: userMessage,
        model: model,
        username: "dummyUser",
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: userMessage },
        { role: "assistant", content: response.data.response },
      ]);

      setUserMessage("");
      console.log(response.data.response);
      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setUserMessage("");
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    setUserMessage("");
    try {
      const response = await axios.patch(`${backendURL}/api/clear`, {
        username: "dummyUser",
      });
      setMessages([]);
      console.log(response.data.response);
    } catch (error) {
      console.error("Error sending message:", error);
      setUserMessage("");
      setMessages([]);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`chat-container ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <div className="chat-body col-sm-10 col-10 d-flex flex-column align-items-center">
          <div className="chat-messages m-2 col-12">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-item ${
                  message.role === "user" ? `user-message` : "assistant-message"
                }`}
              >
                <div className="d-flex">
                  <p className="m-0 p-0">
                    <b>{message.role}:&nbsp;</b>{" "}
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`chat-bottom ${
            isOpen ? "col-6" : "col-10"
          } d-flex flex-md-row flex-column-reverse gap-2 align-items-center justify-content-center`}
        >
          <div className="col-md-6 col-12 chat-msg-input">
            <TextField
              id="outlined-basic"
              fullWidth
              placeholder="Enter your message"
              variant="outlined"
              value={userMessage}
              InputProps={{ sx: { borderRadius: "8px" } }}
              onChange={(e) => {
                setUserMessage(e.target.value);
              }}
              size="small"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>

          <div className="chat-controls d-flex col-md-6 col-12 justify-content-center gap-2">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              size="small"
              className="model-select"
            >
              <MenuItem value={"llama3-8b-8192"}>llama3-8b-8192</MenuItem>
              <MenuItem value={"llama3-70b-8192"}>llama3-70b-8192</MenuItem>
              <MenuItem value={"gemma-7b-it"}>gemma-7b-it</MenuItem>
              <MenuItem value={"mixtral-8x7b-32768"}>mixtral-8x7b-32768</MenuItem>
            </Select>
            <button
              className="chat-button"
              onClick={handleSendMessage}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            >
              Send
            </button>
            <button className="chat-button" onClick={handleClearChat}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
