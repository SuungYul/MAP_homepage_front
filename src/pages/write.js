import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./write.css";
import plus from "../images/plus.png";
import axios from "axios";
import { SERVER_URL } from "../config";
import IsAccessTokenValid from "../token/tokenValid";
import tokenSave from "../token/tokenSave";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";

const Write = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const titleRef = useRef();
  const bodyRef = useRef();
  const [filename, setFilename] = useState();
  const [file, setFile] = useState();
  const accessToken = localStorage.getItem("access_token");
  const { state } = useLocation();
  const [title, setTitle] = useState(state ? state.postTitle : "");
  const [content, setContent] = useState(state ? state.postContent : "");
  // const [id, setId] = useState(state ? state.postId : "");

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    console.log(event.target.files);
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  const FinishForm = () => {
    const accessToken = localStorage.getItem("access_token");
    if (titleRef.current.value === "" || bodyRef.current.value === "") {
      alert("제목 또는 내용을 입력하세요");
      return;
    }

    const formData = new FormData();

    const postRequestDTO = {
      title: titleRef.current.value,
      dtype: "general",
      content: bodyRef.current.value,
    };

    const blob = new Blob([JSON.stringify(postRequestDTO)], {
      type: "application/json",
    });

    formData.append("postRequestDTO", blob);
    formData.append("file", file);

    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
      return;
    }

    if (state) {
      // 수정인 경우
      axios
        .put(`${SERVER_URL}/posts/${state.postId}`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          tokenSave(response.headers["access-token"]);
          if (response.status === 200) {
            alert("수정되었습니다.");
            navigate("/notice");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // 새 게시물 작성인 경우
      axios
        .post(`${SERVER_URL}/posts/general`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          tokenSave(response.headers["access-token"]);
          if (response.status === 200) {
            alert("등록되었습니다.");
            navigate("/notice");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (state) {
      titleRef.current.value = state.postTitle;
      bodyRef.current.value = state.postContent;
    }
  }, [state]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">N O T I C E</div>
        <button className="addButton" onClick={FinishForm}>
          {state ? "수정" : "등록"}
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
          {filename ? (
            <div
              className="textStyle"
              style={{ marginTop: "10px", marginLeft: "20px" }}
            >
              {filename}{" "}
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  color: "red",
                  fontSize: "20px",
                }}
                onClick={() => {
                  setFile(null);
                  setFilename(null);
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

export default Write;
