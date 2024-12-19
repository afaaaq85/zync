import { createContext, useState } from "react";

type AuthContextType = {
  userToken: string;
  setUserToken: (token: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  isGoogle: boolean;
  setIsGoogle: (isGoogle: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken") || "");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [isGoogle,setIsGoogle] = useState(false);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, userName, setUserName,isGoogle,setIsGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
