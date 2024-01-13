import React, { useState } from "react";
import "./login.css";
import kakao from "../images/kakao.png";
import google from "../images/google.png";
import naver from "../images/naver.png";
import axios from "axios";

const Login = ({ setModalOpen }) => {
  //   const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getNaverOAuth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/oauth2/authorize/naver"
      );
      console.log(response);
    } catch (error) {
      console.error("Error during API call", error);
    }
  };

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
            <button onClick={() => getNaverOAuth()}>test</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
