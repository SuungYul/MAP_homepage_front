import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./gallery.css";
import { useAuth } from "../token/useAuth";
import axios from "axios";
import { SERVER_URL } from "../config";
import IsAccessTokenValid from "../token/tokenValid";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";
import tokenSave from "../token/tokenSave";

const Gallery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1); // 페이지 상태를 추적하는 state 변수를 추가합니다.
  const [totalElements, setTotalElements] = useState(0);
  const [allPhotos, setAllPhotos] = useState([]);
  const [lastPage, setLastPage] = useState();

  useAuth();
  const accessToken = localStorage.getItem("access_token");

  const fetchPhotos = () => {
    if (!IsAccessTokenValid()) {
      dispatch(logOut());
      navigate("/login");
    }
    axios
      .get(`${SERVER_URL}/posts/photo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: page,
        },
      })
      .then((response) => {
        tokenSave(response.headers["access-token"]);

        const responsedPhoto = response.data.result.photoPostResponseDTOList;

        setPhotos(responsedPhoto);
        setAllPhotos(responsedPhoto);
        setLastPage(response.data.result.totalPage);
        setTotalElements(response.data.result.totalElements); // 전체 사진 수를 상태로 저장합니다.
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const postPaging = () => {
    const result = [];
    for (let i = 1; i <= lastPage; i++) {
      result.push(
        <a
          onClick={() => setPage(i)}
          style={{
            fontWeight: i === page ? "bold" : "normal",
            cursor: "pointer",
            marginLeft: "20px",
          }}
        >
          {i}
        </a>
      );
    }
    return result;
  };
  const showPhotos = () => {
    const result = [];
    let row = [];

    allPhotos.forEach((element, index) => {
      const date = new Date(element.uploadedTime);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const formattedDate = `${year}-${month}-${day}`;
      row.push(
        <div>
          <div
            key={index}
            className="photoimages4"
            onClick={() => navigate(`/photoread/${element.postId}`)}
          >
            <img src={element.thumbnail} alt="thumbnail" />
          </div>
          <p className="textStyle">{element.title}</p>
          <p className="textStyle">{formattedDate}</p>
        </div>
      );

      if (row.length === 3) {
        result.push(<div className="photocontainer1">{row}</div>);
        row = [];
      }

      if (index === allPhotos.length - 1) {
        result.push(<div className="photocontainer1">{row}</div>);
      }
    });

    return result;
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">P H O T O</div>
        <button className="addButton" onClick={() => navigate("/photowrite")}>
          글쓰기
        </button>
      </div>

      {allPhotos.length !== 0 ? (
        showPhotos()
      ) : (
        <div>
          <p>게시글이 없습니다</p>
          <p>글쓰기 버튼을 눌러 게시글을 작성하세요</p>
        </div>
      )}
      <div className="pageingBox">
        {lastPage >= 1 && (
          <div className="pageingBox">
            {page != 1 && (
              <button
                className="pageingButton"
                onClick={() => setPage(page - 1)}
              >
                이전
              </button>
            )}
            {postPaging()}
            {(page === 1 || page != lastPage) && (
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
      </div>
    </div>
  );
};

export default Gallery;
