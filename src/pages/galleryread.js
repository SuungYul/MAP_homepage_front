import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import "./galleryread.css";
import { useAuth } from "../token/useAuth";
import axios from "axios";
import { SERVER_URL } from "../config";
import IsAccessTokenValid from "../token/tokenValid";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";
import tokenSave from "../token/tokenSave";

const GalleryRead = () => {
  useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [myImage, setMyImage] = useState(null);

  const [photoRead, setPhotoRead] = useState({
    title: "",
    content: "",
    writerId: "",
  });
  const accessToken = localStorage.getItem("access_token");
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const myName = localStorage.getItem("myName");
  const id_ = localStorage.getItem("id");
  const commentRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState();

  const deleteNotice = (id) => {
    if (!isAdmin && id !== id_) {
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
          navigate("/photo");
          //fetchNotices(); // 게시물이 성공적으로 삭제되면, 게시물 목록을 다시 불러옵니다.
        } else {
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
        fetchComments();
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
        fetchContent();
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

  const showPhotos = () => {
    const result = [];

    photos.forEach((element, index) => {
      result.push(
        <div
          key={index}
          className="photoimages4"
          onClick={() => handleFileDownload(element.imageUrl)}
        >
          <img src={element.imageUrl} alt="image" />
        </div>
      );
    });

    return result;
  };

  const handleFileDownload = (url) => {
    window.open(url, "_blank");
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

  const fetchContent = () => {
    //본문 조회 api
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    axios
      .get(`${SERVER_URL}/posts/photo/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        tokenSave(response.headers["access-token"]);
        setPhotos(
          response.data.result.imageResponseListDTO.imageResponseDTOList
        );
        setPhotoRead({
          title: response.data.result.title,
          content: response.data.result.content,
          writerId: response.data.result.writerId,
        });
        setLastPage(response.data.result.totalComment - 1);
        setPage(response.data.result.totalComment - 1); //댓글 조회는 인덱스 0부터 시작해서 1빼서 가져옴
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!IsAccessTokenValid()) {
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
  }, []);

  useEffect(() => {
    fetchComments();
  }, [page]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">P H O T O</div>
        <button className="addButton" onClick={() => navigate("/photo")}>
          목록으로
        </button>
        {(isAdmin || id_ === photoRead.writerId) && (
          <button
            className="addButton"
            style={{ marginLeft: "10px" }}
            onClick={() => deleteNotice(id)}
          >
            삭제
          </button>
        )}
      </div>

      <hr class="hr-solid" />
      <div className="title">{photoRead.title}</div>

      <hr class="hr-solid2" />
      <div className="photoReadContent">{photoRead.content}</div>
      <div className="photocontainer3">{showPhotos()}</div>
      <hr class="hr-solid3" />

      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div className="commentcontainer">
            <div className="commentline"></div>
            <div className="nameAndTime">
              <div className="commentname">{comment.writer}</div>
              <div className="commenttime">
                {comment.createdAt &&
                  new Date(comment.createdAt).toLocaleString("ko-KR")}
              </div>
            </div>
            <div className="aliginBox">
              <div className="box3">
                <img
                  className="profile"
                  src={comment.writerProfileURI}
                  alt="프로필사진"
                ></img>
              </div>
              <div className="commentcontent">{comment.content}</div>
              {(isAdmin || id_ === photoRead.writerId) && (
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
            <div className="commentline2"> </div>
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
        <input ref={commentRef} className="commentInput" type="text"></input>
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
export default GalleryRead;
