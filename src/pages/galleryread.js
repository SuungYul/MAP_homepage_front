import { useNavigate } from "react-router-dom";
import React from "react";
import "./galleryread.css";
import { useAuth } from "../redux/useAuth";
const GalleryRead = () => {
  useAuth();
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
