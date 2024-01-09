import React from "react";
import logo from "../MAP_logo.png"; // 로고 이미지 경로

const Footer = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "400px",
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "10%",
          minHeight: "24px",
          left: "78%",
          top: "30%",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "1.5vw",
          lineHeight: "24px",
          letterSpacing: "-0.015em",
          color: "#000000",
        }}
      >
        Community
      </div>
      <div
        style={{
          position: "absolute",
          width: "10%",
          minHeight: "24px",
          left: "62%",
          top: "30%",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "1.5vw",
          lineHeight: "24px",
          textAlign: "right",
          letterSpacing: "-0.015em",
          color: "#000000",
        }}
      >
        Help desk
      </div>
      <div
        style={{
          position: "absolute",
          width: "10%",
          minHeight: "24px",
          left: "85%",
          top: "30%",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "1.5vw",
          lineHeight: "24px",
          textAlign: "right",
          letterSpacing: "-0.015em",
          color: "#000000",
        }}
      >
        Resources
      </div>
      <div
        style={{
          position: "absolute",
          width: "90%",
          minHeight: "1px",
          left: "5%",
          top: "50%",
          background: "rgba(0, 0, 0, 0.5)",
          transform: "matrix(1, 0, 0, -1, 0, 0)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "10%",
          height: "50px",
          left: "45%",
          top: "26.75%",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "7.6%",
          height: "10.5%",
          left: "46.2%",
          top: "27.75%",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "3% ",
          lineHeight: "37px",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          letterSpacing: "-0.015em",
          color: "#000000",
          border: "2px solid #000000",
        }}
      >
        MAP MJU
      </div>
      <div
        style={{
          position: "absolute",
          width: "2.6%",
          height: "12.5%",
          left: "45%",
          top: "26.75%",
          background: `url(${logo})`,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "15.7%",
          minHeight: "6%",
          left: "42.15%",
          top: "69.5%",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "1.5vw",
          lineHeight: "24px",
          textAlign: "center",
          letterSpacing: "-0.015em",
          color: "rgba(0, 0, 0, 0.8)",
        }}
      >
        MAP, 2023. MJU computer enginnering
      </div>
    </div>
  );
};

export default Footer;
