// useAuth.js
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuth = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 필요");
      localStorage.setItem("prevPath", location.pathname);
      navigate("/login");
    }
  }, []);

  return isLoggedIn;
};
