import { useNavigate } from "react-router-dom";
import React from "react";
import "./galleryread.css";
import { useAuth } from "../redux/useAuth";
const GalleryRead = () => {
  useAuth();
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="nbcontainer">
        <div className="notice">N O T I C E</div>
      </div>
      <hr class="hr-solid" />
      <hr class="hr-solid2" />
      <hr class="hr-solid3" />

      <div className="texts" id="addfile">
        첨부파일
      </div>

      <div className="title">제목</div>
      <div className="photoimages1"></div>
      <div className="photoimages2"></div>
      <div className="photoimages3"></div>
      <div className="filename">본문</div>
    </div>
  );
};
export default GalleryRead;
