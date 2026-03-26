import { createContext } from "react";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (formData) => {
    if (!formData.email || !formData.password) {
      toast.error("Email və şifrəni daxil edin");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);

      setUser(response.data.user);

      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Daxil olmaq mümkün olmadı");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
