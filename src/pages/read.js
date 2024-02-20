import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./read.css";
import axios from "axios";
import { SERVER_URL } from "../config";
import tokenSave from "../token/tokenSave";
import IsAccessTokenValid from "../token/tokenValid";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";

const Read = () => {
  const { id } = useParams();
  const commentRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");
  const id_ = localStorage.getItem("id_");
  const isAdmin = localStorage.getItem("isAdmin");
  const [myImage, setMyImage] = useState(null);
  const [post, setPost] = useState(null); // 상태 설정
  const [comments, setComments] = useState([]); // 상태 설정

  const editNotice = (id) => {
    if (isAdmin !== "true" && id !== id_) {
      alert("본인 또는 관리자만 삭제할 수 있습니다.");
      return; // 함수 실행 중단
    }
    axios
      .put(`${SERVER_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          postId: id,
        },
      })
      .then((response) => {
        console.log(response.title);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteNotice = (id) => {
    if (isAdmin !== "true" && id !== id_) {
      alert("본인 또는 관리자만 삭제할 수 있습니다.");
      return; // 함수 실행 중단
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

  const commentdelete = (id, memberid) => {
    if (isAdmin !== "true" && memberid !== id_) {
      alert("본인 또는 관리자만 삭제할 수 있습니다.");
      return; // 함수 실행 중단
    }
    axios
      .delete(`${SERVER_URL}/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.isSuccess) {
          console.log(response.data.message);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitComment = () => {
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    const requestBody = {
      content: commentRef.current.value,
    };

    axios
      .post(`${SERVER_URL}/comments/${id}`, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        fetchComments();
        console.log(response);
        commentRef.current.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchComments = () => {
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    console.log(accessToken);
    axios
      .get(`${SERVER_URL}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          // postId: id,
          page: "1",
        },
      })
      .then((response) => {
        tokenSave(response.headers["access-token"]);
        console.log(response);
        setComments(response.data.result.commentDetailDtoList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    fetchComments();

    axios
      .get(`${SERVER_URL}/posts/${id}`, {
        //게시글 내용 조회
        // id를 URL에 포함해서 요청
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        tokenSave(response.headers["access-token"]);
        // console.log(response); //응답성공 여기서 꺼내쓰기
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
        // console.log(response);

        setMyImage(response.data.result.profileImg); // 수정된 부분);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
        {isAdmin ? (
          <button className="addButton" onClick={() => editNotice(id)}>
            공지 지정
          </button>
        ) : (
          ""
        )}
        {isAdmin ? (
          <button className="addButton" onClick={() => editNotice(id)}>
            공지 해제
          </button>
        ) : (
          ""
        )}
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
        comments.length > 0 &&
        comments.map((comment) => (
          <div className="commentcontainer">
            <div className="commentline"></div>
            <div className="commentname">{comment.writer}</div>
            <div className="aliginBox">
              <div className="box3">
                <img className="profile" src={myImage} alt="프로필사진"></img>
              </div>
              <div className="commentcontent">{comment.content}</div>
              <div
                className="commentDelete"
                onClick={() =>
                  commentdelete(comment.commentId, comment.memberId)
                }
              >
                삭제
              </div>
            </div>
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

//수정 안됨

// 댓글 조회는 왜 또 안됨?????
