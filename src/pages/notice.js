import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import Footer from "./footer";
import { useAuth } from "../redux/useAuth";
import axios from "axios";
import { SERVER_URL } from "../config";

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
        <div
          style={contentTitleStyle}
          onClick={() => navigate(`/read/${element.postId}`)}
        >
          {element.title}
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

  const container = {
    position: "absolute",
    display: "flex",
    left: "10%", // 조절 가능한 위치 418
    top: "18%", // 조절 가능한 위치 177
    width: "50%",
  };
  const writeButtonStyle = {
    width: "10%",
    height: "10%",
    marginTop: "13px",
    marginLeft: "22px",
    backgroundColor: "white",
    color: "white",
    padding: "1% 2%",
    border: "1px solid #18A0FB",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "15px",
    lineHeight: "18px",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: "-0.015em",
    color: "#18A0FB",
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
  };

  const noticeStyle = {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "48px",
    lineHeight: "72px", // or '150%'
    letterSpacing: "-0.015em",
    color: "#000000",
  };

  const menuStyleContainer = {
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    marginTop: "15%",
    marginLeft: "1700px",
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
  };
  const menuStyle1 = {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px", // or '120%'
    letterSpacing: "-0.015em",
    color: "#000000",
  };

  const menuStyle2 = {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px", // or '120%'
    letterSpacing: "-0.015em",
    color: "#000000",
    marginLeft: "20px",
  };

  const menuStyle3 = {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px", // or '120%'
    letterSpacing: "-0.015em",
    color: "#000000",
    marginLeft: "20px",
  };

  const contentNoticeContainer = {
    display: "flex",
    flexDirection: "column", // 요소들을 세로 방향으로 배치합니다.
    position: "absolute",

    marginTop: "250px",
    marginLeft: "200px",
  };

  const contentNoticeStyle = {
    cursor: "pointer",
    marginBottom: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    color: "#000000",
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
    marginBottom: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
  };

  const contentTitleContainer = {
    display: "flex",
    flexDirection: "column", // 요소들을 세로 방향으로 배치합니다.
    position: "absolute",

    marginTop: "250px",
    marginLeft: "100px",
  };

  const dataContainer = {
    display: "flex",
    flexDirection: "column", // 요소들을 세로 방향으로 배치합니다.

    marginTop: "19%",
    marginLeft: "1710px",
    position: "absolute",
  };

  const dataStyle = {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    color: "#000000",
    marginBottom: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
  };

  const dateContainer = {
    display: "flex",
    flexDirection: "column", // 요소들을 세로 방향으로 배치합니다.

    marginTop: "19%",
    marginLeft: "1770px",
    position: "absolute",
  };
  const writerContainer = {
    display: "flex",
    flexDirection: "column", // 요소들을 세로 방향으로 배치합니다.

    marginTop: "19%",
    marginLeft: "1910px",
    position: "absolute",
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={container}>
        <div style={noticeStyle}>N O T I C E</div>

        <button style={writeButtonStyle} onClick={() => navigate("/write")}>
          글쓰기
        </button>
        <div style={contentNoticeContainer}>
          <div style={contentNoticeStyle} onClick={() => navigate("/read")}>
            공지
          </div>
          <div style={contentNoticeStyle} onClick={() => navigate("/read")}>
            공지
          </div>
          <div style={contentNoticeStyle} onClick={() => navigate("/read")}>
            100
          </div>
          <div style={contentNoticeStyle} onClick={() => navigate("/read")}>
            101
          </div>
        </div>
        <div>
          <div style={contentTitleContainer}>
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
        </div>

        <div style={menuStyleContainer}>
          <div style={menuStyle1}>조회</div>
          <div style={menuStyle2}>첨부파일</div>
          <div style={menuStyle3}>작성자</div>
        </div>

        <div style={dataContainer}>
          <div style={dataStyle}>13</div>
          <div style={dataStyle}>123</div>
          <div style={dataStyle}>1</div>
          <div style={dataStyle}>3</div>
        </div>
        <div style={dateContainer}>
          <div style={dataStyle}>2024/1/1</div>
          <div style={dataStyle}>2024/1/1</div>
          <div style={dataStyle}>2024/1/1</div>
          <div style={dataStyle}>2024/1/1</div>
        </div>
        <div style={writerContainer}>
          <div style={dataStyle}>13</div>
          <div style={dataStyle}>123</div>
          <div style={dataStyle}>1</div>
          <div style={dataStyle}>3</div>
        </div>
      </div>
    </div>
  );
};
export default Notice;
