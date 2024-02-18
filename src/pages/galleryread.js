import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import "./galleryread.css";
import { useAuth } from "../redux/useAuth";
import axios from "axios";
import { SERVER_URL } from "../config";

const GalleryRead = () => {
  useAuth();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/photoread`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    const timeout = setTimeout(() => {
      localStorage.removeItem("access_token");
      navigate("/login");
    }, 1800000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">P H O T O</div>
      </div>

      <hr class="hr-solid" />
      <div className="title">제목</div>

      <hr class="hr-solid2" />
      <div className="photocontainer3">
        <div className="photoimages1"></div>
        <div className="photoimages2"></div>
        <div className="photoimages3"></div>
      </div>
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
