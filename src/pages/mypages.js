import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react"; // useRef 추가
import "./mypages.css";
import { useAuth } from "../redux/useAuth";
import axios from "axios";
import { SERVER_URL } from "../config";
import bolt from "../images/bolt.png";
import profile from "../images/MAP_logo.png";

const MyPages = () => {
  useAuth();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const [myInfo, setMyInfo] = useState({
    studentId: 1,
    name: "홍길동",
    nickname: "엄태성",
    grade: 1,
    profileImgUrl: "images/MAP_logo.png",
  });
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null); // 상태 변수와 설정 함수 추가

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = () => {
    if (!selectedFile) {
      alert("jpg 또는 png 파일을 선택해주세요!");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post(`${SERVER_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // 업로드 성공 시, 프로필 사진 업데이트
        setMyInfo({
          ...myInfo,
          profileImgUrl: response.data.result.profileImg,
        }); // 수정된 부분
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
          profileImgUrl: response.data.result.profileImg, // 수정된 부분
        };
        setMyInfo(myData);
      })
      .catch((error) => {
        console.log(error);
      });

    const timeout = setTimeout(() => {
      localStorage.removeItem("access_token");
      navigate("/login");
    }, 1800000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">M Y P A G E</div>

        <button className="addButton" onClick={deleteUser}>
          회원탈퇴
        </button>
        <div class="box">
          <img
            class="profile"
            src={myInfo.profileImgUrl || profile} // profilePic 대신 profileImg 사용
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

        <div id="phonenumber">전화번호</div>
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

        <div id="shcoolnumber">학번</div>
        <div id="schoolnumberdata">
          {myInfo.studentId} {myInfo.grade}
        </div>
      </div>

      <div>
        <div id="birth">생년월일</div>
        <div id="birthdata">2004.01.28</div>
        <div id="mytitle">내가 쓴 글</div>
        <div id="mytitledata">1.djlkasdklmasklsadnk</div>
      </div>
      <div id="email">이메일</div>
      <div id="emaildata">antdny2280@naver.com</div>
    </div>
  );
};

export default MyPages;
