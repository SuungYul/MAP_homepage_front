import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function CallbackKakao() {
  const location = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code"); // 인증 코드 받기
    // const state = url.searchParams.get("state"); // state 값 받기
    const serverUrl = `http://localhost:8080/oauth2/login/kakao?code=${authorizationCode}`;
    if (authorizationCode) {
      // 서버로 인증 코드 보내기
      axios
        .get(serverUrl)
        .then((response) => {
          // 서버로부터 응답 받은 후의 처리
          const accessToken = response.headers["access-token"];
          const refreshToken = response.headers["refresh-token"];

          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          console.log(localStorage.getItem("access_token"));
        })
        .catch((error) => {
          // 에러 처리
          console.log(error);
        });
    }
  }, [location]);

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
    </div>
  );
}

export default CallbackKakao;
