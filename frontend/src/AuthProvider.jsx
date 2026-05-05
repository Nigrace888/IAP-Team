import { useState } from "react";
import { AuthContext } from "./AuthContext";


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
const login = (userData, authToken) => {
  console.log("AuthContext login called with:", { userData, authToken });
  
  setUser(userData);
  setToken(authToken);
  
  localStorage.setItem("token", authToken);
  localStorage.setItem("user", JSON.stringify(userData));
  
  console.log("AuthContext - Token saved to localStorage:", localStorage.getItem("token"));
  console.log("AuthContext - User saved to localStorage:", localStorage.getItem("user"));
};