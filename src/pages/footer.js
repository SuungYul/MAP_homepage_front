import React from "react";
import "./footer.css";
import logo from "../images/MAP_logo.png";
import { useSelector } from "react-redux";

const Footer = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return null; // 로그인하지 않은 경우 Footer를 렌더링하지 않습니다.
  }
  return (
    <div className="footer">
      <div className="flexWrapperOne">
        <div className="footerLogo">
          <img alt="" className="mapRemovebgPreview2" src={logo} />
          <p className="mapMju">MAP MJU</p>
        </div>
        <div className="links">
          <p className="helpDesk">Help desk</p>
          <p className="community">Community</p>
          <p className="resources">Resources</p>
        </div>
      </div>
      <div className="rectangle" />
      <p className="map2023MjuComputerEnginnering">
        MAP, 2023. MJU computer enginnering
      </p>
    </div>
  );
};

export default Footer;
