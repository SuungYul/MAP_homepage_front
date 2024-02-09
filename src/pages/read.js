import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./read.css";
import axios from "axios";
import { SERVER_URL } from "../config";

const Read = () => {
  const { id } = useParams();
  const commentRef = useRef();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const submitComment = () => {
    axios
      .post(`${SERVER_URL}/comments/${id}`, commentRef.current.value, {
        // 댓글 작성
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
      })
      .then((response) => {
        console.log(response); //댓글 작성 완료
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${SERVER_URL}/posts/${id}`, {
        //게시글 내용 조회
        // id를 URL에 포함해서 요청
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response); //응답성공 여기서 꺼내쓰기
        // 응답을 상태에 저장하거나 화면에 표시
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${SERVER_URL}/comments/`, {
        //댓글 조회
        params: {
          postId: id,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response); //응답성공 여기서 꺼내쓰기
        // 응답을 상태에 저장하거나 화면에 표시
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]); // id가 바뀔 때마다 요청을 다시 보냄
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">N O T I C E</div>
        <button className="addButton" onClick={() => navigate("/notice")}>
          목록으로
        </button>
      </div>

      <div className="readcontentcontainer">
        <div className="readTitle">제목</div>
        <div className="line1"></div>
        <div className="readcontent">본문</div>
        <div className="line2"></div>
        <div className="readfile">첨부파일</div>
        <div className="line3"></div>
      </div>
      <div className="commentcontainer">
        <div className="commentline"></div>
        <div className="commentname">윤동주 (2024.02.01. 18:01)</div>
        <div className="commentcontent">dasnlkdnklasdnlkask </div>
        <div className="commentline2"> </div>
      </div>
      <div className="commentwritecontainer">
        <img className="profilephoto2" alt="프로필사진"></img>
        <input ref={commentRef} className="commentInput" type="text"></input>
      </div>
      <div className="NameUploadContainer">
        <div className="commentname2">윤동주</div>
        <button className="commentwritebutton" onClick={submitComment}>
          {" "}
          등록{" "}
        </button>
      </div>
    </div>
  );
};
export default Read;
// 프로필 사진 추가 해야함
