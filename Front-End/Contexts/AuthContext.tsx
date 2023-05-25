import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string;
  setAuthToken: (newToken: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

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

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};
export { AuthProvider, useAuth };
