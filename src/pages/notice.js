import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./login";

const Notice = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      alert("로그인 필요");
      console.log(location.pathname);
      navigate("/login", {
        state: { from: location.pathname }, // 원래 접근하려던 경로를 저장
      });
    }
  }, []);

  const writeButtonStyle = {
    position: "absolute",
    width: "7%",
    left: "42%", // 조절 가능한 위치
    top: "60%", // 조절 가능한 위치
    backgroundColor: "#000000",
    color: "white",
    padding: "10px 15px",
    border: "1px solid #18A0FB",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "15px",
    lineHeight: "18px",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: "-0.015em",
    color: "#18A0FB",
  };

  const noticeStyle = {
    position: "absolute",
    left: "10%", // 조절 가능한 위치 418
    top: "18%", // 조절 가능한 위치 177
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "48px",
    lineHeight: "72px", // or '150%'
    letterSpacing: "-0.015em",
    color: "#000000",
  };

  const menuStyle = {
    position: "absolute",
    top: "30%", // 조절 가능한 위치 177
    left: "70%", // 조절 가능한 위치 418

    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px", // or '120%'
    letterSpacing: "-0.015em",
    color: "#000000",
  };

  const menuStyle2 = {
    position: "absolute",
    top: "30%", // 조절 가능한 위치 177
    left: "76%", // 조절 가능한 위치 418

    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px", // or '120%'
    letterSpacing: "-0.015em",
    color: "#000000",
  };

  const menuStyle3 = {
    position: "absolute",
    top: "30%", // 조절 가능한 위치 177
    left: "84%", // 조절 가능한 위치 418

    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px", // or '120%'
    letterSpacing: "-0.015em",
    color: "#000000",
  };
  return (
    <div>
      <div style={noticeStyle}>N O T I C E</div>

      <button style={writeButtonStyle} onClick={() => navigate("/login")}>
        글쓰기
      </button>

      <div style={menuStyle}>조회</div>
      <div style={menuStyle2}>첨부파일</div>
      <div style={menuStyle3}>종류</div>
    </div>
  );
};
export default Notice;
