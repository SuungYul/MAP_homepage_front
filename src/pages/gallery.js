import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./gallery.css";
import { useAuth } from "../token/useAuth";
import axios from "axios";
import { SERVER_URL } from "../config";
import IsAccessTokenValid from "../token/tokenValid";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";

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
    photos.forEach((element, index) => {
      console.log(element, index);

      result.push(
        <div
          key={index}
          className="photoimages4"
          onClick={() => navigate(`/galleryread/${element.postId}`)}
        >
          <img src={element.thumbnail} alt="thumbnail" />
        </div>
      );
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
      <div className="photocontainer1">{showPhotos()}</div>
    </div>
  );
};

export default Gallery;
