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
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(null);
  const [allPost, setAllPost] = useState([]);
  const [pages, setPages] = useState([]);
  const [lastPage, setLastPage] = useState();

  const designationNotice = (id) => {
    if (!IsAccessTokenValid()) {
      dispatch(logOut());
      navigate("/login");
      return;
    }
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

        setResult(generalResponse.data.result);
        setPages(generalResponse.data.result.totalPage);

        setNotices(noticeResponse.data.result.postResponseDTOList);
        setGenerals(generalResponse.data.result.postResponseDTOList);
        setAllPost(generalResponse.data.result.postResponseDTOList);
        setLastPage(generalResponse.data.result.totalPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const postPaging = () => {
    const result = [];
    for (let i = 1; i <= lastPage; i++) {
      result.push(
        <a
          onClick={() => setPage(i)}
          style={{
            fontWeight: i === page ? "bold" : "normal",
            cursor: "pointer",
            marginLeft: "20px",
          }}
        >
          {i}
        </a>
      );
    }
    return result;
  };

  const showNotice = () => {
    const result = [];

    notices.forEach((element, index) => {
      if (element.dtype !== "PHOTO") {
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
                  style={{ marginLeft: "5%" }}
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

    allPost.forEach((element, index) => {
      const date = new Date(element.uploadedTime);

      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 0부터 시작하기 때문에 1을 더해줍니다.
      const day = date.getDate();

      const formattedDate = `${year}-${month}-${day}`;

      result.push(
        <div>
          <div style={noticeContainerStyle}>
            {isAdmin && (
              <div style={{ marginLeft: "5%" }}>
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
      fetchNotices(); // fetchNotices가 완료될 때까지 기다림
    };

    fetchDataAndPaging();
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [page]);

  const noticeContainerStyle = {
    // flexGrow: 0, // 공간이 남으면 추가로 차지하지 않음
    // flexShrink: 0, // 공간이 부족하면 줄어들지 않음
    // flexBasis: "auto", // 기본 크기 설정
    borderBottom: "1px solid black",
    display: "flex", 
    alignItems: "center", // 세로 가운데
    flexBasis: "auto", // 기본 크기 설정
    paddingTop: 20,
    paddingBottom: 20,
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
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
    overflow: "hidden", // 내용이 너무 길 때 잘림
    marginLeft: isAdmin ? "25%" : "30%",
  };
  const TitleStyle = {
    position: "absolute",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "25px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
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
    whiteSpace: "nowrap", // 텍스트가 넘칠 때 줄바꿈 방지
    marginRight: "1px", // �� ��소의 아래��� �Righ: "2%", // �� ��소의 아래��� �
    marginLeft: "90%", // ����� ��진 추가
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">B O A R D</div>

        <button className="addButton" onClick={() => navigate("/write")}>
          글쓰기
        </button>
      </div>

      {allPost.length != 0 ? (
        <div>
          <div className="menucontainer">
            <div
              className="menustyle1"
              style={{ visibility: isAdmin ? "visible" : "hidden" }}
            >
              공지등록
            </div>
            <div id = "구분"className="menustyle">구분</div>
            <div id = "제목"className="menustyle">제목</div>
            <div id = "조회"className="menustyle">조회</div>
            <div id = "날짜"className="menustyle">날짜</div>
            <div id = "작성자"className="menustyle">작성자</div>
          </div>

          {showNotice()}
          {showGeneral()}
          <div className="pageingBox">
            {lastPage >= 1 && (
              <div className="pageingBox">
                {page != 1 && (
                  <button
                    className="pageingButton"
                    onClick={() => setPage(page - 1)}
                  >
                    이전
                  </button>
                )}
                {postPaging()}
                {(page === 1 || page != lastPage) && (
                  <button
                    className="pageingButton"
                    onClick={() =>
                      page === lastPage
                        ? alert("마지막 페이지입니다")
                        : setPage(page + 1)
                    }
                  >
                    다음
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>게시글이 없습니다</p>
          <p>글쓰기 버튼을 눌러 게시글을 작성하세요</p>
        </div>
      )}
    </div>
  );
};
export default Notice;
