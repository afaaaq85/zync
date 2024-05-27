import zyngDarkGray from '../assets/imgs/zync-blue.png';

const Navbar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className="brand-top">
        <i className="bi bi-window-sidebar toggle-button fs-4" onClick={toggleSidebar}></i>
        <img src={zyngDarkGray} alt="zync-logo" className={`brand-logo ${isOpen ? "d-none":""}`}/>
        <h2 className={`brand-title ${isOpen ? "d-none":""}`}>zync</h2>
      </div>
      <div className="nav-container">
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <h2>zync</h2>
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
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
