import React, { useEffect, useRef, useState } from "react";
import "./feedBack.css";
import axios from "axios";
import { SERVER_URL } from "../config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn, logOut } from "../redux/actions";
import IsAccessTokenValid from "../token/tokenValid";
import tokenSave from "../token/tokenSave";

const FeedBack = ({ setModalOpen }) => {
  const feedBackRef = useRef(); // 닉네임 입력 필드에 대한 참조 생성

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeModal = () => {
    setModalOpen(false);
  };

  const FinishForm = (event) => {
    event.preventDefault(); // 폼 제출에 의한 페이지 리로딩 방지
    const accessToken = localStorage.getItem("access_token");
    const feedBack = feedBackRef.current.value; // 닉네임 입력 필드의 값을 가져옴
    if (!IsAccessTokenValid()) {
      dispatch(logOut());
      navigate("/login");
    }
    axios
      .post(
        `${SERVER_URL}/feedback`,
        {
          content: feedBack,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        tokenSave(response.headers["access-token"]);
        alert(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        alert(error.data.result);
      });
    closeModal();
    //서버에 제출 및 검증 후 notice페이지로 이동
  };

  return (
    <div className="info">
      <div
        className="info-modal"
        onClick={() => {
          setModalOpen(false);
        }}
      >
        <div
          className="add-modal-content-feedback"
          onClick={(e) => e.stopPropagation()}
        >
          <h1>피드백</h1>
          <form className="forms" onSubmit={FinishForm}>
            <div className="feedback">
              <span className="addTextStyle5">내용</span>
              <textarea
                className="inputFeedBack"
                ref={feedBackRef}
                style={{
                  resize: "none", // 입력 영역 크기 변경 방지
                  whiteSpace: "pre-wrap", // 줄바꿈 허용
                  overflowWrap: "break-word", // 단어 단위 줄바꿈 허용
                }}
              />
              {/* 닉네임 입력 필드에 참조 연결 */}
            </div>

            <input type="submit" className="finishBtn" value="완료" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
