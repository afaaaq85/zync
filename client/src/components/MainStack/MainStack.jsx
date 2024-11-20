import { useState } from "react";
import Chat from "../Home/Chat";
import Navbar from "../Navbar/Navbar";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const MainStack = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsOpen} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Chat />} />
        <Route path="*" element={<div className="mt-5 text-center ">Page not found</div>} />
      </Routes>
    </Router>
  );
};
export default MainStack;