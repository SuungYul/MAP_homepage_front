import { useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import "./gallerywrite.css";
import { useAuth } from "../token/useAuth";
import plus from "../images/plus.png";
import axios from "axios";
import { SERVER_URL } from "../config";
import IsAccessTokenValid from "../token/tokenValid";
import tokenSave from "../token/tokenSave";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";

const GalleryWrite = () => {
  useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");

  const fileInputRef = useRef();
  const titleRef = useRef();
  const bodyRef = useRef();
  const [files, setFiles] = useState([]);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const FinishForm = () => {
    const accessToken = localStorage.getItem("access_token");
    if (files.length === 0) {
      alert("사진을 첨부해주세요!");
      return;
    }
    if (titleRef.current.value === "" || bodyRef.current.value === "") {
      alert("제목 또는 내용을 입력하세요");
    } else {
      const formData = new FormData();

      const postRequestDTO = {
        title: titleRef.current.value,
        dtype: "photo",
        content: bodyRef.current.value,
      };
      const blob = new Blob([JSON.stringify(postRequestDTO)], {
        type: "application/json",
      });
      formData.append("postRequestDTO", blob);
      files.forEach((file) => formData.append("file", file));

      if (!IsAccessTokenValid()) {
        localStorage.clear();
        dispatch(logOut());
        navigate("/login");
      }

      axios
        .post(`${SERVER_URL}/posts/photo`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          tokenSave(response.headers["access-token"]);
          console.log(response);
          if (response.status === 200) {
            alert("등록되었습니다.");
            navigate("/photo");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(titleRef.current.value);
  };

  const handleRemoveFile = (indexToRemove, event) => {
    event.preventDefault(); // 기본 동작 (페이지 새로고침) 방지

    const updatedFiles = files.filter((file, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">P H O T O</div>
        <button className="addButton" onClick={FinishForm}>
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
            ref={titleRef}
            placeholder="제목을 입력해주세요"
          />
        </div>

        <div className="form-group">
          <label className="formText" htmlFor="content">
            내용
          </label>
          <textarea
            ref={bodyRef}
            className="contentBox"
            id="content"
            placeholder="본문을 입력해주세요"
          />
        </div>

        <div className="form-group">
          <label className="formText" htmlFor="addfile">
            첨부파일
          </label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png" // 일단 png만
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <img
            className="addImgButton"
            src={plus}
            alt="Upload"
            onClick={handleUploadButtonClick}
          />
          <div className="fileList">
            {files.map((file, index) => (
              <div
                className="fileStyle"
                key={index}
                style={{ marginTop: "10px" }}
              >
                {file.name}{" "}
                <button
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    color: "red",
                    fontSize: "20px",
                  }}
                  onClick={(event) => handleRemoveFile(index, event)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default GalleryWrite;
