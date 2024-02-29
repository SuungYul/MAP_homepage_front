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
  const [generals, setGenerals] = useState([]);
  const isAdmin = localStorage.getItem("isAdmin");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(null);
  const [allPost, setAllPost] = useState([]);
  const [pages, setPages] = useState([]);

  const pasing = () => {
    const numberOfPages = Math.ceil(allPost / 6);
    let tempPages = [];
    for (let i = 1; i <= numberOfPages; i++) {
      tempPages.push(i);
    }
    setPages(tempPages);
  };
  const designationNotice = (id) => {
    if (!IsAccessTokenValid()) {
      dispatch(logOut());
      navigate("/login");
      return;
    }
    console.log(accessToken);
    axios
      .patch(
        `${SERVER_URL}/posts/general/${id}/notice`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        tokenSave(response.headers["access-token"]);
        fetchNotices();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchNotices = () => {
    if (!IsAccessTokenValid()) {
      dispatch(logOut());
      navigate("/login");
      return;
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
        params: {
          page: page,
        },
      }),
    ])
      .then(([noticeResponse, generalResponse]) => {
        tokenSave(generalResponse.headers["access-token"]);

        console.log(noticeResponse);
        setResult(generalResponse.data.result);

        // uploadedTime 기준으로 최신 순으로 정렬
        const sortedNotices =
          noticeResponse.data.result.postResponseDTOList.sort((a, b) => {
            return new Date(b.uploadedTime) - new Date(a.uploadedTime);
          });

        const sortedGenerals =
          generalResponse.data.result.postResponseDTOList.sort((a, b) => {
            return new Date(b.uploadedTime) - new Date(a.uploadedTime);
          });

        setNotices(sortedNotices);
        setGenerals(sortedGenerals);
        console.log("general", sortedGenerals);
        setAllPost(sortedGenerals);
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
        const date = new Date(element.uploadedTime);

        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 0부터 시작하기 때문에 1을 더해줍니다.
        const day = date.getDate();

        const formattedDate = `${year}-${month}-${day}`;
        result.push(
          <div>
            <div style={noticeContainerStyle}>
              {isAdmin && (
                <button
                  className="cancelButton"
                  onClick={() => designationNotice(element.postId)}
                >
                  -
                </button>
              )}
              <div style={TitleStyle}>공지</div>
              <div
                style={contentTitleStyle}
                onClick={() => navigate(`/read/${element.postId}`)}
              >
                {element.title}
              </div>
              <div style={dataStyle1}>{element.view}</div>
              <div style={dataStyle2}>{formattedDate}</div>
              <div style={dataStyle3}>{element.writerName} </div>
            </div>
          </div>
        );
      }
    });
    return result;
  };

  const showGeneral = () => {
    const result = [];
    // console.log(notices);
    const startIndex = (page - 1) * 6;
    const selectedPost = allPost.slice(startIndex, startIndex + 6);

    selectedPost.forEach((element, index) => {
      console.log(element, index);
      const date = new Date(element.uploadedTime);

      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 0부터 시작하기 때문에 1을 더해줍니다.
      const day = date.getDate();

      const formattedDate = `${year}-${month}-${day}`;

      result.push(
        <div>
          <div style={noticeContainerStyle}>
            {isAdmin && (
              <div>
                {element.notice ? (
                  <button
                    className="cancelButton"
                    onClick={() => designationNotice(element.postId)}
                  >
                    -
                  </button>
                ) : (
                  <button
                    className="designationButton"
                    onClick={() => designationNotice(element.postId)}
                  >
                    +
                  </button>
                )}
              </div>
            )}

            <div style={TitleStyle}>일반</div>
            <div
              style={contentTitleStyle}
              onClick={() => navigate(`/read/${element.postId}`)}
            >
              {element.title}
            </div>
            <div style={dataStyle1}>{element.view}</div>
            <div style={dataStyle2}>{formattedDate}</div>
            <div style={dataStyle3}>{element.writerName} </div>
          </div>
        </div>
      );
    });
    return result;
  };
  useEffect(() => {
    const fetchDataAndPaging = async () => {
      await fetchNotices(); // fetchNotices가 완료될 때까지 기다림
      pasing(); // 그 후 pasing 실행
    };

    fetchDataAndPaging();
  }, []);

  const noticeContainerStyle = {
    display: "flex", // 가로 정렬
    alignItems: "center", // 세로 가운데
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
    marginLeft: "30%",
  };
  const TitleStyle = {
    position: "absolute",
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
    marginLeft: "74%", // ����� ��진 추가

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
    marginLeft: "79%", // ����� ��진 추가

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
    marginLeft: "90%", // ����� ��진 추가
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
        <div
          className="menustyle1"
          style={{ visibility: isAdmin ? "visible" : "hidden" }}
        >
          공지등록
        </div>
        <div className="menustyle2">구분</div>
        <div className="menustyle3">제목</div>
        <div className="menustyle4">조회</div>
        <div className="menustyle5">날짜</div>
        <div className="menustyle6">작성자</div>
      </div>

      {showNotice()}
      {showGeneral()}
      <div className="pageingBox">
        <button className="pageingButton" onClick={() => setPage(page - 1)}>
          이전
        </button>
        <a> {page} </a>
        <button className="pageingButton" onClick={() => setPage(page + 1)}>
          다음
        </button>
      </div>
    </div>
  );
};
export default Notice;
