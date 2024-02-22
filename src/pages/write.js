import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    console.log(event.target.files);
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  useEffect(() => {
    // axios
    //   .get(`${SERVER_URL}/write`, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //   .then((response) => {
    //     // console.log(response);
    //     // const myData = {
    //     //   studentId: response.data.result.studentId,
    //     //   name: response.data.result.name,
    //     //   nickname: response.data.result.nickname,
    //     //   grade: response.data.result.grade,
    //     // };
    //     // setMyInfo(myData);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);
  const FinishForm = () => {
    const accessToken = localStorage.getItem("access_token");
    if (titleRef.current.value === "" || bodyRef.current.value === "") {
      alert("제목 또는 내용을 입력하세요");
    } else {
      const formData = new FormData();

      const postRequestDTO = {
        title: titleRef.current.value,
        dtype: "general",
        content: bodyRef.current.value,
      };
      console.log("file", file);
      const blob = new Blob([JSON.stringify(postRequestDTO)], {
        type: "application/json",
      });
      formData.append("postRequestDTO", blob);
      formData.append("file", file);
      if (!IsAccessTokenValid()) {
        localStorage.clear();
        dispatch(logOut());
        navigate("/login");
      }
      axios
        .post(`${SERVER_URL}/posts`, formData, {
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
            navigate("/notice");
          }
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
