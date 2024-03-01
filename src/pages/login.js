import React, { useEffect, useState } from "react";
//import { useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import kakao from "../images/kakao.png";
import google from "../images/google.png";
import naver from "../images/naver.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";

function redirectToNaverLogin() {
  const clientId = "vozrxRMxgtKeDqpZvkfO"; // 네이버 개발자 센터에서 받은 클라이언트 ID
  const redirectURI = encodeURIComponent(
    "http://localhost:3000/oauth2/login/naver"
  ); // 네이버로부터 인증 코드를 받을 리다이렉트 URI
  const state = "RANDOM_STATE"; // CSRF 공격 방지를 위한 랜덤 문자열
  const apiURL = "https://nid.naver.com/oauth2.0/authorize";

  const url = `${apiURL}?response_type=code&client_id=${clientId}&scope=name%20email%20profile_image&redirect_uri=${redirectURI}&state=${state}`;

  window.location.href = url; // 네이버 로그인 페이지로 리다이렉트
}

function redirectToKakaoLogin() {
  const clientId = "a646059593978bf76530118502f575f3"; // 카카오 개발자 센터에서 받은 클라이언트 ID
  const redirectURI = encodeURIComponent(
    "http://localhost:3000/oauth2/login/kakao"
  ); // 네이버로부터 인증 코드를 받을 리다이렉트 URI
  const state = "RANDOM_STATE"; // CSRF 공격 방지를 위한 랜덤 문자열
  const apiURL = "https://kauth.kakao.com/oauth/authorize";

  const url = `${apiURL}?response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}`;

  window.location.href = url; // 네이버 로그인 페이지로 리다이렉트
}

function test() {
  const accessToken = localStorage.getItem("access_token");
  axios
    .get("http://localhost:8080/test", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

const Login = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    // localStorage.clear();
    dispatch(logOut());
  }, []);

  return (
    <div className="login">
      <div className="login-modal" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h1>로그인</h1>
          <div className="social-buttons">
            <div className="kakao" onClick={redirectToKakaoLogin}>
              <img src={kakao} />
              <p className="textStyle">카카오로 시작하기</p>
            </div>
            <div className="google">
              <img src={google} />
              <p className="textStyle">구글로 시작하기(미구현)</p>
            </div>
            <div className="naver" onClick={redirectToNaverLogin}>
              <img src={naver} />
              <p className="textStyle">네이버로 시작하기</p>
            </div>
            <button onClick={test}>servertest</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
