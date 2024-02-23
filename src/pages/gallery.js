import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./gallery.css";
import { useAuth } from "../token/useAuth";
import axios from "axios";
import { SERVER_URL } from "../config";
import IsAccessTokenValid from "../token/tokenValid";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";

const Gallery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useAuth();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (!IsAccessTokenValid()) {
      dispatch(logOut());
      navigate("/login");
    }
    axios
      .get(`${SERVER_URL}/posts/photo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
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
  }, []);
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">P H O T O</div>
        <button className="addButton" onClick={() => navigate("/gallerywrite")}>
          글쓰기
        </button>
      </div>
      <div className="photocontainer1">
        <div
          className="photoimages4"
          onClick={() => navigate("/galleryread")}
        ></div>
        <div
          className="photoimages5"
          onClick={() => navigate("/galleryread")}
        ></div>
        <div
          className="photoimages6"
          onClick={() => navigate("/galleryread")}
        ></div>
      </div>

      <div className="photocontainer2">
        <div
          className="photoimages4"
          onClick={() => navigate("/galleryread")}
        ></div>
        <div
          className="photoimages5"
          onClick={() => navigate("/galleryread")}
        ></div>
        <div
          className="photoimages6"
          onClick={() => navigate("/galleryread")}
        ></div>
      </div>
    </div>
  );
};

export default Gallery;
