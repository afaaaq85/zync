import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken")||"");
  const [userName,setUserName] = useState(localStorage.getItem("userName")||"");

  return (
    <AuthContext.Provider value={{ userToken, setUserToken,userName,setUserName }}>{children}</AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
