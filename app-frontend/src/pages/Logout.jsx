import React, { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [, , removeCookie] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          "http://localhost:4000/logout",
          {},
          { withCredentials: true }
        );
        removeCookie("jwt");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed", error);
      }
    };

    logout();
  }, [removeCookie, navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
