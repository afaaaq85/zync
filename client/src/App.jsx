import  { useState } from 'react';
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";

function App() {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsOpen}/>
      <Chat isOpen={isOpen} />
    </>
  );
}

export default App;
