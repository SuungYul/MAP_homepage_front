import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./read.css";
import axios from "axios";
import { SERVER_URL } from "../config";

const Read = () => {
  const { id } = useParams();
  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/posts/${id}`, {
        // id를 URL에 포함해서 요청
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response); //응답성공 여기서 꺼내쓰기
        // 응답을 상태에 저장하거나 화면에 표시
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]); // id가 바뀔 때마다 요청을 다시 보냄
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
      <div className="content">본문</div>
      <div className="filename">첨부파일 이름</div>
    </div>
  );
};
export default Read;
