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

        console.log(response);
        const responsedPhoto = response.data.result.photoPostResponseDTOList;
        const sortedPhotos = responsedPhoto.sort((a, b) => {
          return new Date(b.uploadedTime) - new Date(a.uploadedTime);
        });
        setPhotos(sortedPhotos);
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
    const startIndex = (page - 1) * 6;
    const selectedPhotos = allPhotos.slice(startIndex, startIndex + 6);

    const result = [];
    let row = [];

    selectedPhotos.forEach((element, index) => {
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
            onClick={() => navigate(`/galleryread/${element.postId}`)}
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

      if (index === selectedPhotos.length - 1) {
        result.push(<div className="photocontainer1">{row}</div>);
      }
    });

    return result;
  };

  useEffect(() => {
    fetchPhotos();
  }, []);
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">P H O T O</div>
        <button className="addButton" onClick={() => navigate("/gallerywrite")}>
          글쓰기
        </button>
      </div>
      {showPhotos()}
      <div className="pageingBox">
        {page >= 0 && (
          <div className="pageingBox">
            {page != 0 && (
              <button
                className="pageingButton"
                onClick={() => setPage(page - 1)}
              >
                이전
              </button>
            )}
            {postPaging()}
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
      </div>
    </div>
  );
};

export default Gallery;
