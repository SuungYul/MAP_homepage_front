import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./gallery.css";
import { useAuth } from "../redux/useAuth";

const Gallery = () => {
  const navigate = useNavigate();
  useAuth();
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
