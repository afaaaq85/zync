import React, { useState } from 'react';
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <Chat isOpen={isOpen} />
    </>
  );
}

export default App;
