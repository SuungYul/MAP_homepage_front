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
  const id_ = localStorage.getItem("id_");
  const isAdmin = localStorage.getItem("isAdmin");
  const [myImage, setMyImage] = useState(null);
  const [post, setPost] = useState(null); // 상태 설정
  const [comments, setComments] = useState(null); // 상태 설정

  const editNotice = (id) => {
    if (isAdmin !== "true") {
      if (id !== id_) {
        alert("본인 또는 관리자만 삭제할 수 있습니다.");
        return; // 함수 실행 중단
      }
      navigate(`/edit/${id}`);
    }
  };
  const deleteNotice = (id) => {
    if (isAdmin !== "true") {
      if (id !== id_) {
        alert("본인 또는 관리자만 삭제할 수 있습니다.");
        return; // 함수 실행 중단
      }
    }
    axios
      .delete(`${SERVER_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.isSuccess) {
          console.log(response.data.message);
          navigate("/notice");
          //fetchNotices(); // 게시물이 성공적으로 삭제되면, 게시물 목록을 다시 불러옵니다.
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const submitComment = async () => {
    const requestBody = {
      content: commentRef.current.value,
    };

    try {
      const response = await axios.post(
        `${SERVER_URL}/comments/${id}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          params: {
            postId: id,
          },
        }
      );
      // 새로운 댓글을 상태에 추가
      setComments((prevComments) => [...prevComments, response.data.result]);
      commentRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          postId: id,
          page: "1",
        },
      });
      console.log(response);
      setComments(response.data.result.commentDetailDtoList);
    } catch (error) {
      console.log(error);
    }
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

    axios
      .get(`${SERVER_URL}/members/me/preview`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);

        setMyImage(response.data.result.profileImg); // 수정된 부분);
      })
      .catch((error) => {
        console.log(error);
      });

    (async () => {
      await fetchComments();
    })();

    const timeout = setTimeout(() => {
      localStorage.removeItem("access_token");
      navigate("/login");
    }, 1800000);

    return () => {
      clearTimeout(timeout);
    };
  }, [id, accessToken, navigate]);

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
        <button className="addButton" onClick={() => deleteNotice(id)}>
          삭제
        </button>
        <button className="addButton" onClick={() => editNotice(id)}>
          수정
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
        <div className="box2">
          <img className="profile" src={myImage} alt="프로필사진"></img>
        </div>
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
