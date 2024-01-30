import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "../pages/login";

const PrivateRoute = ({ authenticated, component: Component }) => {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    console.log(authenticated);
    if (!authenticated) {
      alert("로그인을 먼저 해야합니다.");
      localStorage.setItem("prevPath", location.pathname); // 현재 URL을 저장
      setModalOpen(true); // 로그인 팝업을 표시
    }
  }, []);

  return authenticated ? Component : <Login setModalOpen={setModalOpen} />;
};

export default PrivateRoute;
