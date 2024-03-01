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
import AddInfo from "./addInfo.js";

const MyPages = () => {
  useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  const [myInfo, setMyInfo] = useState({
    studentId: 1,
    name: "홍길동",
    nickname: "엄태성",
    grade: 1,
    profileImg: "images/MAP_logo.png",
  });
  const [myDetail, setDetail] = useState({
    email: "loading",
    createdAt: "loading",
    socialType: "loading",
    birth: "loading",
    phoneNumber: "loading",
  });
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null); // 상태 변수와 설정 함수 추가

  const [addInfoOpen, setAddInfoOpen] = useState(false);
  const handleEditButtonClick = () => {
    setAddInfoOpen(true);
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    if (!IsAccessTokenValid()) {
      dispatch(logOut());
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
    if (!IsAccessTokenValid()) {
      dispatch(logOut());
      navigate("/login");
    }
    if (isAdmin) {
      navigate("../masterpages"); // 회원관리 페이지 경로로 변경해주세요.
    } else {
      // 일반 사용자인 경우 회원탈퇴 처리
      alert("개발중입니다");
      axios
        .delete(`${SERVER_URL}/members/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (!IsAccessTokenValid()) {
      dispatch(logOut());
      navigate("/login");
      return;
    }
    axios
      .get(`${SERVER_URL}/members/me/preview`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        tokenSave(response.headers["access-token"]);

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

    axios
      .get(`${SERVER_URL}/members/me/detail`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        tokenSave(response.headers["access-token"]);

        setDetail(response.data.result);
        // setMyInfo(myData);
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
          {isAdmin ? "회원관리" : "회원탈퇴"}
          {/* 버튼 텍스트를 조건에 따라 변경 */}
        </button>
        {isAdmin && (
          <button
            className="goFeedBack"
            onClick={() => {
              navigate("/masterpages/feedback");
            }}
          >
            {"피드백조회"}
          </button>
        )}

        <div class="box4">
          <img
            class="profile"
            src={myInfo.profileImg}
            alt="프로필사진"
            // onClick={openFilePicker}
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
        <div id="name">이름</div>
        <div id="namedata">{myInfo.name}</div>

        <div id="phonenumber">전화번호</div>
        <div id="phonenumberdata">{myDetail.phoneNumber}</div>
      </div>
      <div>
        <div id="fakename">
          닉네임
          <img
            className="bolt"
            src={bolt}
            alt="설정"
            onClick={handleEditButtonClick}
          ></img>
        </div>
        <div id="fakenamedata">{myInfo.nickname}</div>

        <div id="shcoolnumber">
          학번/학년
          <img
            className="bolt"
            src={bolt}
            alt="설정"
            onClick={handleEditButtonClick}
          ></img>
        </div>
        <div id="schoolnumberdata">
          {myInfo.studentId} / {myInfo.grade}
        </div>
      </div>
      <div>
        <div id="email">이메일</div>
        <div id="emaildata">{myDetail.email}</div>
        <div id="mytitle">가입날짜</div>
        <div id="mytitledata">
          {myDetail.createdAt &&
            new Date(myDetail.createdAt).toLocaleString("ko-KR")}
        </div>
        <div>
          <div id="birth">생년월일</div>
          <div id="birthdata">{myDetail.birth}</div>
        </div>
      </div>

      {addInfoOpen && (
        <AddInfo
          setModalOpen={setAddInfoOpen}
          nickname={myInfo.nickname}
          stuId={myInfo.studentId}
          grade={myInfo.grade}
          edit={true}
        />
      )}
    </div>
  );
};

export default MyPages;
