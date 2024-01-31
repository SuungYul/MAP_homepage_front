import { useNavigate } from "react-router-dom";
import React from "react";
import "./gallerywrite.css";
import { useAuth } from "../redux/useAuth";

const GalleryWrite = () => {
  useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="nbcontainer">
        <div className="notice">P H O T O</div>
        <button className="writeButton" onClick={() => navigate("/gallery")}>
          등록
        </button>
      </div>

      <div className="texts" id="title">
        제목
      </div>
      <div className="texts" id="content">
        내용
      </div>
      <div className="texts" id="addfile">
        첨부파일
      </div>
      <input
        className="titleBox"
        type="text"
        placeholder="제목을 입력해주세요"
      ></input>
      <input
        className="contentBox"
        type="text"
        placeholder="본문을 입력해주세요"
      ></input>
      <button className="addfileButton" onClick={() => navigate("/notice")}>
        {" "}
        업로드{" "}
      </button>
    </div>
  );
};
export default GalleryWrite;
