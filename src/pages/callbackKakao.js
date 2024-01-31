import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AddInfo from "./addInfo";
import LocationContext from "../locationContext";

function CallbackKakao() {
  const loc = useLocation();
  const navigate = useNavigate();
  const { location, setLocation } = useContext(LocationContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    const serverUrl = `http://localhost:8080/oauth2/login/kakao?code=${authorizationCode}`;
    if (authorizationCode) {
      axios
        .get(serverUrl)
        .then((response) => {
          console.log("CallbackKakao:", location); // 콘솔 출력

          const accessToken = response.headers["access-token"];
          const refreshToken = response.headers["refresh-token"];

          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          console.log(localStorage.getItem("access_token"));
          // if (response.data.result.infoSet) {
          //   //추가 정보를 입력해야하는지 여부
          //   navigate("/notice");
          // } else {
          //   openModal();
          // }
          if (location) {
            navigate(location);
            setLocation(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "2em",
      }}
    >
      로그인 처리 중...
      {modalIsOpen && <AddInfo setModalOpen={setIsOpen} />}
    </div>
  );
}

export default CallbackKakao;
