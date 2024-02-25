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
      })
      .then((response) => {
        tokenSave(response.headers["access-token"]);

        console.log(response);
        const responsedPhoto = response.data.result.photoPostResponseDTOList;
        const sortedPhotos = responsedPhoto.sort((a, b) => {
          return new Date(b.uploadedTime) - new Date(a.uploadedTime);
        });
        setPhotos(sortedPhotos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showPhotos = () => {
    const result = [];
    let row = [];

    photos.forEach((element, index) => {
      const date = new Date(element.uploadedTime);

      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 0부터 시작하기 때문에 1을 더해줍니다.
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

      // 마지막 row를 추가
      if (index === photos.length - 1) {
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
    </div>
  );
};

export default Gallery;
