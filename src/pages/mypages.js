import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react"; // useRef 추가
import "./mypages.css";

import axios from "axios";
import { SERVER_URL } from "../config";
import bolt from "../images/bolt.png";
import { useAuth } from "../token/useAuth";
import IsAccessTokenValid from "../token/tokenValid";
import tokenSave from "../token/tokenSave";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";

const MyPages = () => {
  useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");
  const isAdmin = localStorage.getItem("isAdmin");

  const [myInfo, setMyInfo] = useState({
    studentId: 1,
    name: "홍길동",
    nickname: "엄태성",
    grade: 1,
    profileImg: "images/MAP_logo.png",
  });
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null); // 상태 변수와 설정 함수 추가

  const editMyInfo = () => {
    const requestBody = {
      studentId: myInfo.studentId,
      nickname: myInfo.nickname,
      birth: myInfo.birth,
      grade: myInfo.grade,
    };

    axios
      .patch(`${SERVER_URL}/members/me`, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      navigate("/login");
    }
    axios
      .post(`${SERVER_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        tokenSave(response.headers["access-token"]);

        // 업로드 성공 시, 프로필 사진 업데이트
        setMyInfo({ ...myInfo, profileImg: response.data.result.profileImg }); // 수정된 부분
      })
      .catch((error) => {
        // 업로드 실패 시, 에러 처리
        console.error("Failed to upload file:", error);
      });
  };

  // 파일 선택 창 열기
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const deleteUser = () => {
    //회원탈퇴 처리
    IsAccessTokenValid();
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
    // 관리자인 경우 회원관리로 이동

    if (isAdmin) {
      navigate("../masterpages"); // 회원관리 페이지 경로로 변경해주세요.
    } else {
      // 일반 사용자인 경우 회원탈퇴 처리
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
    }
  };
  useEffect(() => {
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    axios
      .get(`${SERVER_URL}/members/me/preview`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        tokenSave(response.headers["access-token"]);

        console.log("preview");
        console.log(response);
        const myData = {
          studentId: response.data.result.studentId,
          name: response.data.result.name,
          nickname: response.data.result.nickname,
          grade: response.data.result.grade,
          profileImg: response.data.result.profileImg, // 수정된 부분
        };
        setMyInfo(myData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">M Y P A G E</div>

        <button className="addButton" onClick={deleteUser}>
          {isAdmin ? "회원관리" : "회원탈퇴"}{" "}
          {/* 버튼 텍스트를 조건에 따라 변경 */}
        </button>
        <div class="box4">
          <img
            class="profile"
            src={myInfo.profileImg}
            alt="프로필사진"
            onClick={openFilePicker}
          ></img>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button onClick={uploadFile}>Upload</button>
        </div>
      </div>

      <div>
        <div id="name">
          이름
          <img
            className="bolt"
            src={bolt}
            alt="설정"
            onClick={() => navigate("/")}
          ></img>
        </div>
        <div id="namedata">{myInfo.name}</div>

        <div id="phonenumber">
          전화번호
          <img
            className="bolt"
            src={bolt}
            alt="설정"
            onClick={() => navigate("/")}
          ></img>
        </div>
        <div id="phonenumberdata">010-6659-2280</div>
      </div>
      <div>
        <div id="fakename">
          닉네임
          <img
            className="bolt"
            src={bolt}
            alt="설정"
            onClick={() => navigate("/")}
          ></img>
        </div>
        <div id="fakenamedata">{myInfo.nickname}</div>

        <div id="shcoolnumber">
          학번/학년
          <img
            className="bolt"
            src={bolt}
            alt="설정"
            onClick={() => editMyInfo()}
          ></img>
        </div>
        <div id="schoolnumberdata">
          {myInfo.studentId} / {myInfo.grade}
        </div>
      </div>

      <div>
        <div>
          <div id="birth">
            생년월일
            <img
              className="bolt"
              src={bolt}
              alt="설정"
              onClick={() => navigate("/")}
            ></img>
          </div>
          <div id="birthdata">2004.01.28</div>
        </div>
        <div id="mytitle">내가 쓴 글</div>
        <div id="mytitledata">1.djlkasdklmasklsadnk</div>
      </div>
      <div id="email">
        이메일
        <img
          className="bolt"
          src={bolt}
          alt="설정"
          onClick={() => navigate("/")}
        ></img>
      </div>
      <div id="emaildata">antdny2280@naver.com</div>
    </div>
  );
};

export default MyPages;
