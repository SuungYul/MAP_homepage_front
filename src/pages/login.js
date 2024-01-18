import React, { useEffect, useState } from "react";
//import { useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import kakao from "../images/kakao.png";
import google from "../images/google.png";
import naver from "../images/naver.png";
//import axios from "axios";

function redirectToNaverLogin() {
  const clientId = "vozrxRMxgtKeDqpZvkfO"; // 네이버 개발자 센터에서 받은 클라이언트 ID
  const redirectURI = encodeURIComponent(
    "http://localhost:3000/login/oauth2/code/naver"
  ); // 네이버로부터 인증 코드를 받을 리다이렉트 URI
  const state = "RANDOM_STATE"; // CSRF 공격 방지를 위한 랜덤 문자열
  const apiURL = "https://nid.naver.com/oauth2.0/authorize";

  const url = `${apiURL}?response_type=code&client_id=${clientId}&scope=name%20email%20profile_image&redirect_uri=${redirectURI}&state=${state}`;

  window.location.href = url; // 네이버 로그인 페이지로 리다이렉트
}

const Login = ({ setModalOpen }) => {
  //   const [modalOpen, setModalOpen] = useState(false);

  // const navigate = useNavigate();
  // let location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/login/oauth2/code/naver") {
  //     // 네이버 로그인 후 리다이렉트되었을 때 수행할 동작을 여기에 작성합니다.
  //     navigate("/notice");
  //   }
  //   console.log(location);
  // }, [location]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const getNaverOAuth = () => {
  //   // try {
  //   //   const response = await axios.get(
  //   //     "http://localhost:8080/oauth2/authorize/naver"
  //   //   );
  //   //   console.log(response);
  //   // } catch (error) {
  //   //   console.error("Error during API call", error);
  //   // }
  //   const url =
  //     "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=vozrxRMxgtKeDqpZvkfO&scope=name%20email%20profile_image&state=7qmSMT5VR3I296xndzleCGbGqpSz48gS9Ne5kh4sQX0%3D&redirect_uri=http://localhost:3000";
  //   window.location.href = url;
  // };

  return (
    <div className="login">
      {/* <button className="login-button" onClick={openModal}>
        로그인
      </button> */}

      <div className="login-modal" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h1>로그인</h1>
          <div className="social-buttons">
            <div className="kakao">
              <img src={kakao} />
              <p className="textStyle">카카오로 시작하기</p>
            </div>
            <div className="google">
              <img src={google} />
              <p className="textStyle">구글로 시작하기</p>
            </div>
            <div className="naver">
              <img src={naver} />
              <p className="textStyle">네이버로 시작하기</p>
            </div>
            <button onClick={redirectToNaverLogin}>test</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
