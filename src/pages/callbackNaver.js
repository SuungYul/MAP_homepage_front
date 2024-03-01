import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AddInfo from "./addInfo";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../redux/actions";
import { SERVER_URL } from "../config";
import tokenSave from "../token/tokenSave";

function CallbackNaver() {
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code"); // 인증 코드 받기
    const state = url.searchParams.get("state"); // state 값 받기
    const serverUrl = `${SERVER_URL}/oauth2/login/naver?code=${authorizationCode}&state=${state}`;

    if (authorizationCode && state) {
      // 서버로 인증 코드 보내기
      axios
        .get(serverUrl)
        .then((response) => {
          const isAdmin = response.data.result.role === "ADMIN"; //admin으로 바꾸기
          const id_ = response.data.result.id;
          const accessToken = response.headers["access-token"];
          localStorage.setItem("isAdmin", isAdmin);
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("id_", id_);
          tokenSave(accessToken);
          if (response.data.result.infoSet) {
            //추가 정보를 입력해야하는지 여부
            dispatch(logIn());
            const location = localStorage.getItem("prevPath") || "/notice"; // 로컬 스토리지에서 location 불러오기
            if (location) {
              navigate(location);
              localStorage.removeItem("location"); // 페이지 이동 후에는 저장된 위치 삭제
            }
          } else {
            openModal();
          }
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
      {modalIsOpen && <AddInfo setModalOpen={setIsOpen} />}
    </div>
  );
}

export default CallbackNaver;
