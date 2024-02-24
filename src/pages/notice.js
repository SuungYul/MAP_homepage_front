import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import Footer from "./footer";
import { useAuth } from "../token/useAuth";

import axios from "axios";
import { SERVER_URL } from "../config";
import "./notice.css";
import tokenSave from "../token/tokenSave";
import IsAccessTokenValid from "../token/tokenValid";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";

const Notice = () => {
  useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");
  const [notices, setNotices] = useState([]);

  const fetchNotices = () => {
    if (!IsAccessTokenValid()) {
      dispatch(logOut());
      navigate("/login");
    }
    Promise.all([
      axios.get(`${SERVER_URL}/posts/general/notice`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      axios.get(`${SERVER_URL}/posts/general`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ])
      .then(([noticeResponse, generalResponse]) => {
        tokenSave(generalResponse.headers["access-token"]);
        console.log(noticeResponse);
        const combinedNotices =
          noticeResponse.data.result.postResponseDTOList.concat(
            generalResponse.data.result.postResponseDTOList
          );

        // createdAt 기준으로 최신 순으로 정렬
        const sortedNotices = combinedNotices.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setNotices(sortedNotices);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showNotice = () => {
    const result = [];
    console.log(notices);
    notices.forEach((element, index) => {
      if (element.dtype !== "PHOTO") {
        console.log(element, index);

        result.push(
          <div>
            <div style={noticeContainerStyle}>
              <div style={TitleStyle}> {element.notice ? "공지" : "일반"}</div>
              <div
                style={contentTitleStyle}
                onClick={() => navigate(`/read/${element.postId}`)}
              >
                {element.title}
              </div>
              <div style={dataStyle1}>{element.view}</div>
              <div style={dataStyle2}>{element.accessUrl ? "이미지" : "X"}</div>
              <div style={dataStyle3}>{element.writerName} </div>
            </div>
          </div>
        );
      }
    });
    return result;
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const deletebutton = {
    position: "absolute",
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    cursor: "pointer",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    color: "rgba(34, 72, 158, 0.8)",
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
    marginLeft: "94%", // ����� ��진 추가
  };
  const editbutton = {
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    cursor: "pointer",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    color: "rgba(34, 72, 158, 0.8)",
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
    marginLeft: "20%", // ������� ��진 추가
    marginRight: "1%",
  };
  const noticeContainerStyle = {
    display: "flex", // 가로 정렬
    alignItems: "center", // 세로 가운데
    justifyContent: "space-between", // 요소들 사이의 간격을 균등하게 유지
    flexGrow: 0, // 공간이 남으면 추가로 차지하지 않음
    flexShrink: 0, // 공간이 부족하면 줄어들지 않음
    flexBasis: "auto", // 기본 크기 설정
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
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
    overflow: "hidden", // 내용이 너무 길 때 잘림
    marginRight: "55%",
  };
  const TitleStyle = {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    marginLeft: "13%",
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
  };
  const dataStyle1 = {
    position: "absolute",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    marginRight: "1px", // 오른쪽 마진 추가
    marginLeft: "70%", // ����� ��진 추가

    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
  };
  const dataStyle2 = {
    position: "absolute",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.]
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
    marginLeft: "77%", // ����� ��진 추가

    marginRight: "1px", // 오른쪽 마진 추가
  };
  const dataStyle3 = {
    position: "absolute",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    marginTop: "100px", // 각 요소의 아래쪽 간격을 20px로 설정합니다.
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
    marginRight: "1px", // �� ��소의 아래��� �Righ: "2%", // �� ��소의 아래��� �
    marginLeft: "88%", // ����� ��진 추가
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
    </div>
  );
};
export default Notice;
