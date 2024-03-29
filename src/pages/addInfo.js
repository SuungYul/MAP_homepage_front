import React, { useEffect, useRef } from "react";
import "./addInfo.css";
import axios from "axios";
import { SERVER_URL } from "../config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn, logOut } from "../redux/actions";
import IsAccessTokenValid from "../token/tokenValid";

const AddInfo = ({ setModalOpen, nickname, stuId, grade, edit }) => {
  const nicknameRef = useRef(); // 닉네임 입력 필드에 대한 참조 생성
  const numberRef = useRef(); // 학번 입력 필드에 대한 참조 생성
  const gradeRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeModal = () => {
    setModalOpen(false);
  };

  const FinishForm = (event) => {
    event.preventDefault(); // 폼 제출에 의한 페이지 리로딩 방지
    const accessToken = localStorage.getItem("access_token");
    const nickname = nicknameRef.current.value; // 닉네임 입력 필드의 값을 가져옴
    const number = numberRef.current.value; // 학번 입력 필드의 값을 가져옴
    const grade = gradeRef.current.value;
    if (!IsAccessTokenValid()) {
      dispatch(logOut());
      navigate("/login");
    }
    axios
      .patch(
        `${SERVER_URL}/members/me`,
        {
          studentId: number,
          nickname: nickname,
          grade: grade,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (edit) {
          window.location.replace("/mypages");
          return;
        }
        if (response.data.result.infoSet) {
          dispatch(logIn());
          const location = localStorage.getItem("prevPath") || "/board"; // 로컬 스토리지에서 location 불러오기
          if (location) {
            navigate(location);
            localStorage.removeItem("location"); // 페이지 이동 후에는 저장된 위치 삭제
            window.location.reload();
          }
        } else {
          alert("에러 발생");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("에러 발생 관리자에게 문의하세요");
        navigate("/");
      });

    closeModal();
    //서버에 제출 및 검증 후 notice페이지로 이동
  };
  useEffect(() => {
    if (edit) {
      nicknameRef.current.value = nickname;
      numberRef.current.value = stuId;
      gradeRef.current.value = grade;
    }
  }, []);

  return (
    <div className="info">
      <div
        className="info-modal"
        onClick={() => {
          if (edit) {
            setModalOpen(false);
          }
        }}
      >
        <div className="add-modal-content" onClick={(e) => e.stopPropagation()}>
          {edit ? <h1>사용자 변경</h1> : <h1>추가정보</h1>}
          <form className="forms" onSubmit={FinishForm}>
            <div className="nickname">
              <span className="addTextStyle0">닉네임</span>
              <input ref={nicknameRef} /> {/* 닉네임 입력 필드에 참조 연결 */}
            </div>
            <div className="number">
              <span className="addTextStyle">학번</span>
              <input className="inputNumber" ref={numberRef} />{" "}
              {/* 학번 입력 필드에 참조 연결 */}
            </div>
            <div className="grade">
              <span className="addTextStyle">학년</span>
              <input className="inputNumber" ref={gradeRef} />{" "}
              {/* 학년 입력 필드에 참조 연결 */}
            </div>
            <input type="submit" className="finishBtn" value="완료" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInfo;
