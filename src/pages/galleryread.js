import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import "./galleryread.css";
import { useAuth } from "../token/useAuth";
import axios from "axios";
import { SERVER_URL } from "../config";
import IsAccessTokenValid from "../token/tokenValid";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";

const GalleryRead = () => {
  useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const accessToken = localStorage.getItem("access_token");

  const showPhotos = () => {
    const result = [];
    photos.forEach((element, index) => {
      console.log(element, index);

      result.push(
        <div key={index} className="photoimages4">
          <img src={element.imageUrl} alt="image" />
        </div>
      );
    });
    return result;
  };

  useEffect(() => {
    if (!IsAccessTokenValid()) {
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
        console.log(response);
        setPhotos(
          response.data.result.imageResponseListDTO.imageResponseDTOList
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">P H O T O</div>
      </div>

      <hr class="hr-solid" />
      <div className="title">제목</div>

      <hr class="hr-solid2" />
      <div className="photocontainer3">{showPhotos()}</div>
      <hr class="hr-solid3" />

      <div className="title" id="addfile">
        첨부파일
      </div>

      <div className="commentcontainer">
        <div className="commentline"></div>
        <div className="commentname">윤동주 (2024.02.01. 18:01)</div>
        <div className="commentcontent">dasnlkdnklasdnlkask </div>
        <div className="commentline2"> </div>
      </div>
      <div className="commentwritecontainer">
        <img className="profilephoto2" alt="프로필사진"></img>
        <input className="commentInput" type="text"></input>
      </div>
      <div className="NameUploadContainer">
        <div className="commentname2">윤동주</div>
        <button className="commentwritebutton"> 등록 </button>
      </div>
    </div>
  );
};
export default GalleryRead;
