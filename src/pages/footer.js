import React, { useState } from "react";
import "./footer.css";
import logo from "../images/MAP_logo.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FeedBack from "./feedBack";

const Footer = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  if (!isLoggedIn) {
    return null; // 로그인하지 않은 경우 Footer를 렌더링하지 않습니다.
  }
  return (
    <div className="footer">
      <div className="flexWrapperOne">
        <div
          className="footerLogo"
          onClick={() => {
            localStorage.getItem("access_token")
              ? navigate("/notice")
              : navigate("/");
          }}
        >
          <img alt="" className="mapRemovebgPreview2" src={logo} />
          <p className="mapMju">MAP MJU</p>
        </div>
        <div className="links">
          <p
            className="feedBack"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Feed Back
          </p>
          <p className="community">Community</p>
          <p className="resources">Resources</p>
        </div>
      </div>
      <div className="rectangle" />
      <p className="map2023MjuComputerEnginnering">
        MAP, 2024. MJU computer enginnering
      </p>
      {modalOpen && <FeedBack setModalOpen={setModalOpen} />}
    </div>
  );
};

export default Footer;
