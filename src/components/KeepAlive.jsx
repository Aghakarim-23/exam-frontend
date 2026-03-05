import React, { useEffect } from "react";
import api from "../api/axios";

const KeepAlive = () => {
  useEffect(() => {
    const pingServer = async () => {
      try {
        await api.get("/api/keep-alive");
        console.log("Server is alive ✅");
      } catch (error) {
        console.error("Server ping failed ❌", error);
      }
    };
    pingServer();

    const interval = setInterval(pingServer, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default KeepAlive;
