import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string;
  setAuthToken?: (newToken: string) => void;
}

const AuthContext = createContext<AuthContextType>({ token: "" });
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState("");

  const setAuthToken = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.setAuthToken) {
    throw new Error("setAuthToken is not available in AuthContext");
  }
  const { setAuthToken } = authContext;

  return authContext;
};
export { AuthProvider, AuthContext, useAuth };
