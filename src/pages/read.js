import React from "react";
import { useNavigate } from "react-router-dom";
import "./read.css";

const Read = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">N O T I C E</div>
      </div>

      <div className="readcontentcontainer">
        <div className="readTitle">제목</div>
        <div className="line1"></div>
        <div className="readcontent">본문</div>
        <div className="line2"></div>
        <div className="readfile">첨부파일</div>
        <div className="line3"></div>
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
export default Read;
// 프로필 사진 추가 해야함
