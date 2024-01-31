import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./gallery.css";
import { useAuth } from "../redux/useAuth";

const Gallery = () => {
  const navigate = useNavigate();
  useAuth();
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="nbcontainer">
        <div className="notice">P H O T O</div>
        <button
          className="writeButton"
          onClick={() => navigate("/gallerywrite")}
        >
          글쓰기
        </button>
      </div>
      <div
        className="photoimages1"
        onClick={() => navigate("/galleryread")}
      ></div>
      <div
        className="photoimages2"
        onClick={() => navigate("/galleryread")}
      ></div>
      <div
        className="photoimages3"
        onClick={() => navigate("/galleryread")}
      ></div>

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
  );
};

export default Gallery;
