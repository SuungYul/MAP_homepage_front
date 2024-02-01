import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./write.css";
import plus from "../images/plus.png";
import axios from "axios";
import { SERVER_URL } from "../config";

const Write = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const titleRef = useRef();
  const bodyRef = useRef();
  const [filename, setFilename] = useState();

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    console.log(event.target.files);
    setFilename(event.target.files[0].name);
  };

  const FinishForm = () => {
    const accessToken = localStorage.getItem("access_token");
    if (titleRef.current.value === "" || bodyRef.current.value === "") {
      alert("제목 또는 내용을 입력하세요");
    } else {
      axios
        .post(
          `${SERVER_URL}/posts`,
          {
            title: titleRef.current.value,
            dtype: "general",
            content: bodyRef.current.value,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(titleRef.current.value);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">N O T I C E</div>
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
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <img
            className="addImgButton"
            src={plus}
            alt="Upload"
            onClick={handleUploadButtonClick}
          />
          {/* {파일 존재? <div>{filename}, 삭제36버튼</div> : null} */}
        </div>
      </form>
    </div>
  );
};

export default Write;
