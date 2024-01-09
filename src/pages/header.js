import React from "react";
import logo from "../MAP_logo.png"; // 로고 이미지 경로

const Header = () => {
  const headerStyle = {
    position: "fixed",
    width: "100%",
    height: "60px",
    background: "#000000",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0px 10px", // 좌우 패딩 추가
  };

  const groupStyle = {
    // padding: "0 20px",
    display: "flex",
    alignItems: "center",
  };

  const logoStyle = {
    width: "50px",
    height: "50px",
    backgroundImage: `url(${logo})`,
  };

  const textStyle = {
    // width: "146px",
    // height: "42px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "37px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: "-0.015em",
    color: "#FFFFFF",
    border: "2px solid #000000",
  };

  const menuStyle = {
    // width: "89px",
    // height: "29px",
    paddingRight: "20px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "30px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: "-0.015em",
    color: "#18A0FB",
  };

  return (
    <header style={headerStyle}>
      <div style={groupStyle}>
        <div style={logoStyle} />
        <div style={textStyle}>MAP MJU</div>
      </div>
      <div style={groupStyle}>
        <div style={menuStyle}>Start</div>
        <div style={menuStyle}>Notice</div>
        <div style={menuStyle}>Calendar</div>
        <div style={menuStyle}>Photo</div>
        <div style={menuStyle}>MyPage</div>
      </div>
    </header>
  );
};

export default Header;
