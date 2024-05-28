import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import zyncWhite from "../assets/imgs/zync-white.png";
import zyncDarkGray from "../assets/imgs/zync-darkgray.png";
// import Lottie from "lottie-react";
// import TypingAnimation from "../assets/anim/typing.json";
// import DOMPurify from "dompurify";

function Chat({ isOpen }) {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [model, setModel] = useState("llama3-8b-8192");
  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_API_URL;

  const handleSendMessage = async () => {
    setUserMessage("");
    setMessages((prevMessages) => [...prevMessages, { role: "user", content: userMessage }]);
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/api/chat`, {
        message: userMessage,
        model: model,
        username: "dummyUser",
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: response.data.response },
      ]);

      console.log(response.data.response);
      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
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
      setMessages([]);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`chat-container ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <div className="welcome-header d-flex align-items-center mt-4">
          <h2 className="p-0 m-0"> playground</h2>
        </div>

        {messages.length === 0 ? (
          <div className="welcome-tagline">
            <img src={zyncWhite} alt="logo" className="brand-logo" />
            <p className="m-0 p-0 mt-1">Welcome to zync's playground</p>
          </div>
        ) : (
          <div className="chat-body col-sm-6 col-10 d-flex flex-column align-items-center ">
            <div className="chat-messages m-2 col-12">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-item ${
                    message.role === "user" ? "user-message" : "assistant-message"
                  }`}
                >
                  <div className="d-flex">
                    <p className="m-0 p-0">
                      <b>{message.role === "user" ? "You" : "Assistant"}:&nbsp;</b>
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: message.content }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={`chat-bottom d-flex flex-lg-row flex-column-reverse col-sm-8 col-xl-7 col-10 gap-1`}>
          <div className="col-lg-6 col-12 mb-2 mb-md-0">
            <TextField
              id="outlined-basic"
              fullWidth
              placeholder="Enter your message"
              variant="outlined"
              value={userMessage}
              InputProps={{ sx: { borderRadius: "8px" } }}
              onChange={(e) => setUserMessage(e.target.value)}
              size="small"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>
          <div className="d-flex col-lg-6 col-12 justify-content-lg-end justify-content-center gap-2">
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
