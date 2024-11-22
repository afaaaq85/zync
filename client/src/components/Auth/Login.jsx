/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import zyncBlue from "../../assets/imgs/zync-blue.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Toast from "../Toast/Toast";


const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const backendURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { setUserToken } = useAuth();


  const handleChangeForm = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${backendURL}/user/login`, loginData);
      console.log("response:", response.data.token);
      setUserToken(response.data.token);
      localStorage.setItem("userToken", response.data.token);
      if (response.status === 200) {
        setToastMessage("Login successful");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      console.log("error:", error.response.data.error);
      setToastMessage(error.response.data.error);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center mb-3">
      <div className="login-container d-flex flex-column col-sm-6 col-lg-4 col-8   align-items-center justify-content-center">
        {/* logo */}
        <div className="login-title-wlogo d-flex flex-column align-items-center mt-3">
          <img src={zyncBlue} alt="zync-logo" />
          <h3>zync.com</h3>
        </div>

        {/* login form */}
        <div className="login-form d-flex flex-column col-12 px-2">
          <div className="d-flex flex-column col-12 mt-2">
            <label htmlFor="email">Username or primary email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={loginData.email}
              onChange={(e) => handleChangeForm(e)}
            />
          </div>
          <div className="d-flex flex-column col-12 mt-2">
            <label htmlFor="password">Password</label>
            <div className="password-field d-flex align-items-center justify-content-between">
              <input
                type={togglePassword ? "text" : "password"}
                id={togglePassword ? "password-show" : "password"}
                className="col-11"
                name="password"
                value={loginData.password}
                onChange={(e) => handleChangeForm(e)}
              ></input>
              {togglePassword ? (
                <i
                  className="bi bi-eye-slash"
                  onClick={() => setTogglePassword(!togglePassword)}
                ></i>
              ) : (
                <i className="bi bi-eye" onClick={() => setTogglePassword(!togglePassword)}></i>
              )}
            </div>
          </div>
          <p className="text-primary text-end text-password mt-1">Forgot your password?</p>
          <div className="d-flex align-items-center gap-2">
            <input id="checkbox" type="checkbox" />
            <label htmlFor="checkbox" className="fw-light">
              Remember me
            </label>
          </div>
          <button className="login-button my-1" onClick={handleLogin}>
            Sign in
          </button>
          <p className="terms-text">
            By signing in you accept the
            <a> Terms of Use and acknowledge the Privacy Statement and Cookie Policy.</a>{" "}
          </p>
          <p className="terms-text text-center" onClick={() => navigate("/signup")}>
            Don't have an account yet? <a>Register now</a>
          </p>
          <div className="text-between-lines">
            <hr className="line" />
            <span className="text">or sign in with</span>
            <hr className="line" />
          </div>
          <div className="login-btns d-flex flex-column gap-2 mt-4">
            <button className="w-100 d-flex align-items-center justify-content-center gap-2">
              <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" />
              <p className="m-0">Google</p>
            </button>
            <button className="w-100 d-flex align-items-center justify-content-center gap-2">
              <img src="https://img.icons8.com/?size=100&id=62856&format=png&color=000000" />
              <p className="m-0">GitHub</p>
            </button>
            <button className="w-100 d-flex align-items-center justify-content-center gap-2">
              <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000" />
              <p className="m-0">LinkedIn</p>
            </button>
          </div>
        </div>
      </div>
      <Toast showToast={showToast} toastMessage={toastMessage} />
    </div>
  );
};

export default Login;
