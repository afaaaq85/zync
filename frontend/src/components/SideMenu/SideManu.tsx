import { useEffect } from "react";
import zyncDarkGray from "../../assets/imgs/zync-darkgray.png";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

interface SideMenuProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

const SideMenu = ({ isOpen, toggleSidebar, setIsOpen }: SideMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserToken, isGoogle,setIsGoogle } = useAuth();
  const cliendId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  
  useEffect(() => {
    console.log("is google:",isGoogle)
  })

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserToken("");
    navigate("/");
    setIsGoogle(false);
    toggleSidebar();
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.clientX > 250) {
        setIsOpen(false);
      }
    });
  }, [setIsOpen]);

  return (
    <>
      <div className={`brand-top ${location.pathname === "/" ? "d-none" : "d-flex"}`}>
       <div className="toggle-button flex flex-col gap-1" onClick={toggleSidebar}>
        <div className="line1"></div>
       </div>
        <h2 className={`brand-title ${isOpen ? "d-none" : " ms-3"}`}>zync</h2>
      </div>
      <div className="nav-container">
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <div className="sidebar-logo d-flex align-items-center gap-2 ">
            <img src={zyncDarkGray} alt="zync-logo" className={`brand-logo `} />
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
            {isGoogle ? (
              <GoogleLogout
                clientId={cliendId}
                buttonText="Logout"
                onLogoutSuccess={handleLogout}
              />
            ) : (
              <Link onClick={handleLogout} to={"/"} className="text-decoration-none text-danger">
                <p>Logout</p>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
