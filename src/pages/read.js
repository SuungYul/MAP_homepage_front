import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./read.css";
import axios from "axios";
import { SERVER_URL } from "../config";

const Read = () => {
  const { id } = useParams();
  const commentRef = useRef();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const [post, setPost] = useState(null); // 상태 설정
  const [comments, setComments] = useState(null); // 상태 설정

  const submitComment = () => {
    axios
      .post(
        `${SERVER_URL}/comments/${id}`,
        { comment: commentRef.current.value }, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json", // 여기를 수정했습니다.
          },
        }
      )
      .then((response) => {
        console.log(response);
        fetchComments();
        commentRef.current.value = ""; // 댓글이 성공적으로 등록된 후, 댓글 작성란을 비워줍니다.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchComments = () => {
    axios
      .get(`${SERVER_URL}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setComments(response.data.result.commentDetailDtoList);
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
        setPost(response.data.result); // 응답을 상태에 저장
      })
      .catch((error) => {
        console.log(error);
      });

    fetchComments();

    const timeout = setTimeout(() => {
      localStorage.removeItem("access_token");
      navigate("/login");
    }, 1800000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (post === null) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">N O T I C E</div>
        <button className="addButton" onClick={() => navigate("/notice")}>
          목록으로
        </button>
      </div>

      <div className="readcontentcontainer">
        <div className="readTitle">{post.title}</div>
        <div className="line1"></div>
        <div className="readcontent">{post.content}</div>
        <div className="line2"></div>
        <div className="readfile">{post.dtype}</div>
        <div className="line3"></div>
      </div>

      {comments &&
        comments.map((comment) => (
          <div className="commentcontainer">
            <div className="commentline"></div>
            <div className="commentname">{comment.writer}</div>
            <div className="commentcontent">{comment.content}</div>
            <div className="commentline2"> </div>
          </div>
        ))}

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
