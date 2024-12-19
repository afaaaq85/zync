import { useState } from "react";
import zyncBlue from "../../assets/imgs/zync-blue.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Toast from "../Toast/Toast";
import loadingAnimation from "../../assets/anim/botLoading.json";
import Lottie from "lottie-react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const backendURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { setUserToken, setIsGoogle } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [variant, setVariant] = useState("info");
  const cliendId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const response = await axios.post(`${backendURL}/user/login`, {
        email: loginData.email,
        password: loginData.password,
      });
      console.log("response:", response.data.token);
      setUserToken(response.data.token);
      localStorage.setItem("userToken", response.data.token);
      if (response.status === 200) {
        setToastMessage("Login successful");
        setVariant("success");
        setIsLoggingIn(false);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      setIsLoggingIn(false);
      setVariant("error");
      const err = error as Error;
      console.error("error:", err);
      setToastMessage("Login failed, plesae try again!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log("Login success", res);
    setToastMessage("Login successful");
    setVariant("success");
    if ("accessToken" in res && res.accessToken) {
      localStorage.setItem("userToken", res.accessToken);
      setUserToken(res.accessToken);
    }
    setIsGoogle(true);
    navigate("/home");
  };

  const onFailure = (res: unknown) => {
    console.log("Login failed", res);
    setToastMessage("Login failed, plesae try again!");
    setVariant("error");
  };

  return (
    <>
      {isLoggingIn && (
        <div className="loading-container">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            style={{ width: "200px", height: "auto" }}
          />
        </div>
      )}
      <div
        className={`login-page mt-5 d-flex align-items-center justify-content-center mb-3 ${
          isLoggingIn && "opacity-half"
        }`}
      >
        <div className="login-container d-flex flex-column col-sm-6 col-lg-4 col-8   align-items-center justify-content-center">
          {/* logo */}
          <div className="login-title-wlogo d-flex flex-column align-items-center mt-3">
            <img src={zyncBlue} alt="zync-logo" />
            <h3>zync.com</h3>
          </div>

          {/* login form */}
          <div className="login-form d-flex flex-column col-12 px-2">
            <div className="d-flex flex-column col-12 mt-2">
              <label htmlFor="email">Email</label>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeForm(e)}
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
            {/* <div className="d-flex align-items-center gap-2">
            <input id="checkbox" type="checkbox" />
            <label htmlFor="checkbox" className="fw-light">
              Remember me
            </label>
          </div> */}
            <button className="login-button my-1" onClick={handleLogin}>
              Sign in
            </button>
            <p className="terms-text">
              By signing in you accept the
              <a> Terms of Use and acknowledge the Privacy Statement and Cookie Policy.</a>{" "}
            </p>
            <p className="terms-text text-center">
              Don't have an account yet? <a onClick={() => navigate("/signup")}>Register now</a>
            </p>
            <div className="text-between-lines">
              <hr className="line" />
              <span className="text">or sign in with</span>
              <hr className="line" />
            </div>
            <div className="login-btns d-flex flex-column gap-2 mt-4">
              {/* <button onClick={handleGoogleLogin} className="w-100 d-flex align-items-center justify-content-center gap-2">
                <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" />
                <p className="m-0">Google</p>
              </button> */}
              <div>
                <GoogleLogin
                  clientId={cliendId}
                  buttonText="Login with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
              </div>
              {/* <button className="w-100 d-flex align-items-center justify-content-center gap-2">
                <img src="https://img.icons8.com/?size=100&id=62856&format=png&color=000000" />
                <p className="m-0">GitHub</p>
              </button>
              <button className="w-100 d-flex align-items-center justify-content-center gap-2">
                <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000" />
                <p className="m-0">LinkedIn</p>
              </button> */}
            </div>
          </div>
        </div>
        <Toast showToast={showToast} toastMessage={toastMessage} variant={variant} />
      </div>
    </>
  );
};

export default Login;
