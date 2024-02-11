import { useNavigate } from "react-router-dom";
import React from "react";
import "./gallerywrite.css";
import { useAuth } from "../redux/useAuth";

const GalleryWrite = () => {
  useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">N O T I C E</div>
        <button className="addButton" onClick={() => navigate("/gallerywrite")}>
          등록
        </button>
      </div>

      <form className="form">
        <div className="form-group">
          <label className="formText" htmlFor="title">
            제목
          </label>
          <input
            className="titleBox"
            type="text"
            id="title"
            placeholder="제목을 입력해주세요"
          />
        </div>

        <div className="form-group">
          <label className="formText" htmlFor="content">
            내용
          </label>
          <textarea
            className="contentBox"
            id="content"
            placeholder="본문을 입력해주세요"
          />
        </div>

        <div className="form-group">
          <label className="formText" htmlFor="addfile">
            첨부파일
          </label>
          <input type="file" style={{ display: "none" }} />
          <img className="addImgButton" alt="Upload" />
          <div
            className="textStyle"
            style={{ marginTop: "10px", marginLeft: "20px" }}
          >
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "red",
                fontSize: "20px",
              }}
            >
              X
            </button>
          </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};
export default GalleryWrite;
