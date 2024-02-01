import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./mypages.css";
import { useAuth } from "../redux/useAuth";
import axios from "axios";
import { SERVER_URL } from "../config";

const MyPages = () => {
  useAuth();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const [myInfo, setMyInfo] = useState({
    studentId: 1,
    name: "홍길동",
    nickname: "엄태성",
    grade: 1,
  });

  const deleteUser = () => {
    //회원탈퇴 처리
    axios
      .delete(`${SERVER_URL}/members/me`, {
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
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/members/me/preview`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        const myData = {
          studentId: response.data.result.studentId,
          name: response.data.result.name,
          nickname: response.data.result.nickname,
          grade: response.data.result.grade,
        };
        setMyInfo(myData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="nbcontainer">
        <div className="notice">M Y P A G E</div>
        <button className="addButton" onClick={deleteUser}>
          회원탈퇴
        </button>
        <img alt="" src="../images/MAP_logo.png" />
      </div>
      <div id="name">이름</div>

      <div id="bolt1">
        <div onClick={() => navigate("/")}>설정</div>
      </div>
      <div id="fakename">닉네임</div>
      <div id="bolt2" onClick={() => navigate("/")}></div>
      <div id="birth">생년월일</div>
      <div id="bolt3" onClick={() => navigate("/")}></div>
      <div id="email">이메일</div>
      <div id="bolt4" onClick={() => navigate("/")}></div>
      <div id="phonenumber">전화번호</div>
      <div id="shcoolnumber">학번</div>
      <div id="mytitle">내가 쓴 글</div>
      <button className="writeButton" onClick={() => navigate("/notice")}>
        MORE
      </button>

      <div></div>
      <div id="namedata">{myInfo.name}</div>
      <div id="fakenamedata">{myInfo.nickname}</div>
      <div id="birthdata">2004.01.28</div>
      <div id="emaildata">antdny2280@naver.com</div>
      <div id="phonenumberdata">010-6659-2280</div>
      <div id="schoolnumberdata">
        {myInfo.studentId} {myInfo.grade}
      </div>
      <div id="mytitledata">1.djlkasdklmasklsadnk</div>
    </div>
  );
};

export default MyPages;
