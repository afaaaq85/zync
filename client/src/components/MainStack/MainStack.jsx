import { useState } from "react";
import Chat from "../Home/Chat";
import Navbar from "../Navbar/Navbar";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "../../PrivateRoute";
import useAuth from "../../hooks/useAuth";

const MainStack = () => {
    const {userToken} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      {userToken && <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsOpen} />}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Chat />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<div className="mt-5 text-center ">Page not found</div>} />
      </Routes>
    </Router>
  );
};

export default MainStack;
