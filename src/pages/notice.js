import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import Footer from "./footer";
import { useAuth } from "../redux/useAuth";
import axios from "axios";
import { SERVER_URL } from "../config";
import "./notice.css";

const Notice = () => {
  useAuth();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const [notices, setNotices] = useState([]);

  const showNotice = () => {
    const result = [];
    console.log(notices);
    notices.forEach((element, index) => {
      console.log(element, index);

      result.push(
        <div>
          <div style={noticeContainerStyle}>
            <div style={TitleStyle}> 공지</div>
            <div
              style={contentTitleStyle}
              onClick={() => navigate(`/read/${element.postId}`)}
            >
              {element.title}
            </div>
            <div style={dataStyle1}>{element.views}</div>
            <div style={dataStyle2}>{element.dtype}</div>
            <div style={dataStyle3}>{element.role}</div>
          </div>
        </div>
      );
    });
    return result;
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("response");
        console.log(response.data);
        setNotices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const noticeContainerStyle = {
    display: "flex", // 가로 정렬
    alignItems: "center", // 세로 가운데
    justifyContent: "space-between", // 요소들 사이의 간격을 균등하게 유지
  };

  const contentTitleStyle = {
    cursor: "pointer",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    color: "rgba(34, 72, 158, 0.8)",
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    marginLeft: "5%",
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
  };
  const TitleStyle = {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    marginLeft: "20%",
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
  };
  const dataStyle1 = {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    marginRight: "-15%",

    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
  };
  const dataStyle2 = {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.]
    marginRight: "-18%",
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
  };
  const dataStyle3 = {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    marginRight: "12%",
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">N O T I C E</div>

        <button className="addButton" onClick={() => navigate("/write")}>
          글쓰기
        </button>
      </div>

      <div className="menucontainer">
        <div className="menustyle">조회</div>
        <div className="menustyle">첨부파일</div>
        <div className="menustyle">작성자</div>
      </div>

      {showNotice()}
      {/* <div style={contentTitleStyle} onClick={() => navigate("/read")}>
              Nemo enim ipsam voluptatem quia voluptas sit asp
            </div>
            <div style={contentTitleStyle} onClick={() => navigate("/read")}>
              Nemo enim{" "}
            </div>
            <div style={contentTitleStyle} onClick={() => navigate("/read")}>
              Nemo enim ipsam voluptatem quia voluptas sit asp
            </div>
            <div style={contentTitleStyle} onClick={() => navigate("/read")}>
              Nemo enim ipsam voluptatem quia voluptas sit asp
            </div> */}
    </div>
  );
};
export default Notice;
