import { useEffect } from "react";
import zyncDarkGray from "../../assets/imgs/zync-darkgray.png";
import useAuth from "../../hooks/useAuth";
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = ({ isOpen, toggleSidebar,setIsOpen }) => {
 
  const location = useLocation();
  const {setUserToken} = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserToken("");
    toggleSidebar();
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if(e.clientX > 250) {
        setIsOpen(false)
      }
    })
  },[setIsOpen])

  return (
    <>
      <div className={`brand-top ${location.pathname === "/" ? "d-none" : "d-flex"}`}>
        <i className="bi bi-window-sidebar toggle-button fs-4" onClick={toggleSidebar}></i>
        <h2 className={`brand-title ${isOpen ? "d-none" : " ms-3"}`}>zync</h2>
      </div>
      <div className="nav-container">
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <div className="sidebar-logo d-flex align-items-center gap-2 ">
            <img
              src={zyncDarkGray}
              alt="zync-logo"
              className={`brand-logo `}
            />
            <h2 className="p-0 m-0 mb-1">zync</h2>
          </div>
          <ul className="nav-items">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Clients</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <Link onClick={handleLogout} to={"/"} className="text-decoration-none text-danger">
              <p>Logout</p>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
