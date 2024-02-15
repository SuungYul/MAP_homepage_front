import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./gallerywrite.css";
import { useAuth } from "../redux/useAuth";
import axios from "axios";
import { SERVER_URL } from "../config";

const GalleryWrite = () => {
  useAuth();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  axios
    .get(`${SERVER_URL}/photowirte`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      // console.log(response);
      // const myData = {
      //   studentId: response.data.result.studentId,
      //   name: response.data.result.name,
      //   nickname: response.data.result.nickname,
      //   grade: response.data.result.grade,
      // };
      // setMyInfo(myData);
    })
    .catch((error) => {
      console.log(error);
    });

  useEffect(() => {
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
            ></button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default GalleryWrite;
