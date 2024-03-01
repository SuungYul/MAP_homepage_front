import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AddInfo from "./addInfo";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../redux/actions";
import { SERVER_URL } from "../config";
import tokenSave from "../token/tokenSave";

function CallbackKakao() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    const serverUrl = `${SERVER_URL}/oauth2/login/kakao?code=${authorizationCode}`;
    if (authorizationCode) {
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
          console.log(error);
          alert("에러 발생 관리자에게 문의하세요");
          navigate("/");
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
      {modalIsOpen && (
        <AddInfo
          setModalOpen={setIsOpen}
          nickname={null}
          grade={null}
          stuId={null}
          edit={false}
        />
      )}
    </div>
  );
}

export default CallbackKakao;
