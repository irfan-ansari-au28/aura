import { createContext, useContext, useState } from 'react';
import axiosInstance from '../axiosInstance';
import useToast from './useToast';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("Guest");
   const { showToast } = useToast();

   const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: username,
        password: password,
      });
  
      if (response) {
        const { access_token, token_type, user } = response.data;
  
        // Save access token and token type
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
  
        // Save user info
        localStorage.setItem("user", JSON.stringify(user));
  
        // Update state
        setUser(user);
  
        return response;
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.detail || 'Something went wrong!';
      console.error(errorMsg);
      showToast(errorMsg, 'error');
      return error;
    }
  };
  

  const logout = () => {
    setUser(null);
    localStorage.clear();
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}