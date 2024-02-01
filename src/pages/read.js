import React from "react";
import { useNavigate } from "react-router-dom";
import "./read.css";

const Read = () => {
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
