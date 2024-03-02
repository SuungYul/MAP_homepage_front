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
  const myName = localStorage.getItem("myName");
  const id_ = localStorage.getItem("id_");
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const [myImage, setMyImage] = useState(null);
  const [post, setPost] = useState(null); // 상태 설정
  const [comments, setComments] = useState([]); // 상태 설정
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState();

  const handleFileDownload = () => {
    const url = post.attachedFileResponseDTO.fileUrl;
    const link = document.createElement("a");
    link.href = url;
    link.download = post.attachedFileResponseDTO.originalName; // 파일 이름 지정
    link.click();
  };
  const editNotice = (id) => {
    if (!isAdmin && id !== id_) {
      alert("본인 또는 관리자만 삭제할 수 있습니다.");
      return; // 함수 실행 중단
    }
    navigate("/write", {
      state: {
        postTitle: post.title,
        postContent: post.content,
        postId: id,
      },
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
          navigate("/board");
          //fetchNotices(); // 게시물이 성공적으로 삭제되면, 게시물 목록을 다시 불러옵니다.
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const commentdelete = (id, memberid) => {
    if (!isAdmin && memberid !== id_) {
      alert("본인 또는 관리자만 삭제할 수 있습니다.");
      return; // 함수 실행 중단
    }
    axios
      .delete(`${SERVER_URL}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.isSuccess) {
        }
        fetchComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitComment = (e) => {
    e.preventDefault();
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
        //fetchContent(); 조회수 때문에 본문은 갱신하지 않는걸로
        fetchComments();
        commentRef.current.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchComments = () => {
    //댓글 조회 api
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    page >= 0 &&
      axios
        .get(`${SERVER_URL}/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            // postId: id,
            page: page,
          },
        })
        .then((response) => {
          tokenSave(response.headers["access-token"]);
          setComments(response.data.result.commentDetailDtoList);
          setLastPage(response.data.result.totalPage - 1);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const fetchContent = () => {
    //본문 조회 api
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    axios
      .get(`${SERVER_URL}/posts/general/${id}`, {
        //게시글 내용 조회
        // id를 URL에 포함해서 요청
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        tokenSave(response.headers["access-token"]);
        console.log("본문", response); //응답성공 여기서 꺼내쓰기
        // 응답을 상태에 저장하거나 화면에 표시
        setPost(response.data.result); // 응답을 상태에 저장
        setLastPage(response.data.result.totalComment - 1);
        // setPage(response.data.result.totalComment - 1); //댓글 조회는 인덱스 0부터 시작해서 1빼서 가져옴
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const commentPaging = () => {
    const result = [];
    for (let i = 0; i <= lastPage; i++) {
      result.push(
        <a
          onClick={() => setPage(i)}
          style={{
            fontWeight: i === page ? "bold" : "normal",
            cursor: "pointer",
            marginLeft: "20px",
          }}
        >
          {i + 1}
        </a>
      );
    }
    return result;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    fetchContent();
    fetchComments();

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

  useEffect(() => {
    fetchComments();
  }, [page]);

  if (post === null) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">B O A R D</div>
        <button className="addButton" onClick={() => navigate("/board")}>
          목록으로
        </button>
        {(isAdmin || id_ === post.writerId) && (
          <>
            <button
              className="addButton"
              style={{ marginLeft: "10px" }}
              onClick={() => deleteNotice(id)}
            >
              삭제
            </button>
            <button
              className="addButton"
              style={{ marginLeft: "10px" }}
              onClick={() => editNotice(id)}
            >
              수정
            </button>
          </>
        )}
      </div>

      <div className="readcontentcontainer">
        <div className="readTitle">{post.title}</div>
        <div className="readcontent">{post.content}</div>
        <div className="readfile">
          <span>
            {post.attachedFileResponseDTO
              ? "📁 " +post.attachedFileResponseDTO.originalName
              : "첨부파일 없음"}
          </span>
          {post.attachedFileResponseDTO && (
            // <button onClick={() => handleFileDownload()}> 다운로드</button>
            <button class="btnDownload" onClick={() => handleFileDownload()}>
              Download
            </button>
          )}
        </div>
      </div>

      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div className="commentcontainer">
      

            <div className="aliginBox">
              <div className="writer-info">
                <div className="box3">
                  <img
                    id = "comment-profile"
                    className="profile"
                    src={comment.writerProfileURI}
                    alt="프로필사진"
                  ></img>
                </div>
                <div className="nameAndTime">
              <div className="commentname">{comment.writer}</div>
              <div className="commenttime">
                {comment.createdAt &&
                  new Date(comment.createdAt).toLocaleString("ko-KR")}
              </div>
            </div>
              </div>
              <div className="commentcontent">{comment.content}</div>
              {(isAdmin || id_ === post.writerId) && (
                <div
                  className="commentDelete"
                  onClick={() =>
                    commentdelete(comment.commentId, comment.memberId)
                  }
                >
                  삭제
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="commentcontainer">
          <p className="textStyle">댓글이 없습니다</p>{" "}
        </div>
      )}
      {page >= 0 && (
        <div className="pageingBox">
          {page != 0 && (
            <button className="pageingButton" onClick={() => setPage(page - 1)}>
              이전
            </button>
          )}
          {commentPaging()}
          {(page === 0 || page != lastPage) && (
            <button
              className="pageingButton"
              onClick={() =>
                page === lastPage
                  ? alert("마지막 페이지입니다")
                  : setPage(page + 1)
              }
            >
              다음
            </button>
          )}
        </div>
      )}
      <div className="commentwritecontainer">
        <div className="box2">
          <img className="profile" src={myImage} alt="프로필사진"></img>
        </div>
        <textarea ref={commentRef} className="commentInput" type="text" />
      </div>
      <div className="NameUploadContainer">
        <div className="commentname2">{myName}</div>
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
