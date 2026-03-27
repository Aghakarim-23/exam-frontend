import { createContext } from "react";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false); 
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

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
      toast.error(error.response?.data?.message || error.message || "Daxil olmaq mümkün olmadı");
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
