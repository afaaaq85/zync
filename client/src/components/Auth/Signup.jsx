/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import zyncBlue from "../../assets/imgs/zync-blue.png";

const Signup = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [signupData, setLoginData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChangeForm = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateFields = () => {
    const newerrors = {};
    if (!signupData.fname) {
      newerrors.fname = "First name is required*";
    }
    if (!signupData.username) {
      newerrors.username = "Username is required*";
    }
    if (!signupData.email) {
      newerrors.email = "Email is required*";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newerrors.email = "Email is invalid!";
    }
    if (!signupData.password.trim()) {
      newerrors.password = "Password is required*";
    } else if (signupData.password.trim().length < 8) {
      newerrors.password = "Password must be at least 8 characters!";
    }
    setErrors(newerrors);
    let errorLength = Object.keys(newerrors);
    if (errorLength.length > 0) {
      return false;
    }
    return true;
  };

  const handleRegisterUser = () => {
    const validationResult = validateFields();
    if (!validationResult) {
      console.log("error in fields");
    }else{
      //apply endpoint for signup
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
          <div className="d-flex flex-sm-row flex-column col-12 gap-2 mt-2">
            <div className="d-flex flex-column col-sm-5 col-12 flex-grow-1">
              <label htmlFor="fname">First name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                required
                value={signupData.fname}
                onChange={(e) => handleChangeForm(e)}
              />
              {errors.fname && <span className="error-text">{errors.fname}</span>}
            </div>
            <div className="d-flex flex-column col-sm-5 col-12 flex-grow-1">
              <label htmlFor="lname">Last name</label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={signupData.lname}
                onChange={(e) => handleChangeForm(e)}
              />
            </div>
          </div>
          <div className="d-flex flex-column col-12 mt-2">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="usename"
              name="username"
              value={signupData.username}
              onChange={(e) => handleChangeForm(e)}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          <div className="d-flex flex-column col-12 mt-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={signupData.email}
              onChange={(e) => handleChangeForm(e)}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
            {!errors.email && (
              <p className="text-recommend m-0">We recommend using work email address.</p>
            )}
          </div>
          <div className="d-flex flex-column col-12 mt-2">
            <label htmlFor="password">Password</label>
            <div className="password-field d-flex align-items-center justify-content-between">
              <input
                type={togglePassword ? "text" : "password"}
                id={togglePassword ? "password-show" : "password"}
                className="col-11"
                name="password"
                value={signupData.password}
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
            {errors.password && <span className="error-text">{errors.password}</span>}
            {!errors.password && (
              <p className="text-recommend m-0">Minimum length is 8 characters.</p>
            )}
          </div>

          <button className="login-button my-1 mt-3" type="submit" onClick={handleRegisterUser}>
            Register
          </button>
          <p className="terms-text">
            By clicking Register or registering through a third party you accept the Zync's
            <a> Terms of Use and acknowledge the Privacy Statement and Cookie Policy.</a>{" "}
          </p>
          <p className="terms-text text-center">Register with:</p>
          <div className="login-btns d-flex flex-column gap-2 mt-2">
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
          <p className="terms-text text-center mt-2">
            Already have an account?<a> Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
