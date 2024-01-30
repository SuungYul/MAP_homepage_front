import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import myimage from "../MAP_image.png";
import altimage1 from "../altimage1.jpg";
import altimage2 from "../altimage2.jpg";
import altimage3 from "../altimage3.jpg";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("access_token");
  }, []);

  const [introductionIndex, setIntroductionIndex] = useState(0);

  const fullscreensection = {
    height: "100vh",
    backgroundColor: "#000000",
  };

  const ellipseStyle = {
    width: "10px",
    height: "10px",
    background: "#FF5050",
    borderRadius: "50%",
    display: "inline-block",
    marginLeft: "5px", // Adj
  };

  const introductionStyles = [
    {
      position: "absolute",
      top: "29%",
      left: "25%",
      textAlign: "left",
      fontFamily: "Montserrat",
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "60px",
      lineHeight: "30px",
      letterSpacing: "-0.015em",
      color: "#FFFFFF",
      zIndex: 1,
    },
    // 추가된 Introduction 스타일들을 여기에 계속 추가할 수 있습니다.
  ];

  const photostyle = {
    position: "relative",
    height: "90%",
    // width: "100%", 우측 여백 생김
    marginLeft: "55%",
    top: "10%",
    backgroundImage: `url(${myimage})`,
    backgroundRepeat: "no-repeat",
  };

  const scrollsection = {
    backgroundColor: "#000000",
    height: "50vh",
  };

  const imageStyle = {
    position: "absolute",
    bottom: "-40%",
    display: "flex",
    justifyContent: "space-evenly",
    padding: "0px",
    width: "100%",
  };

  const altImageStyle = {
    width: "30%", // 조절 가능한 이미지 크기
  };

  const signInButtonStyle = {
    position: "absolute",
    width: "7%",
    left: "42%", // 조절 가능한 위치
    top: "60%", // 조절 가능한 위치
    backgroundColor: "#000000",
    color: "white",
    padding: "10px 15px",
    border: "1px solid #18A0FB",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "15px",
    lineHeight: "18px",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: "-0.015em",
    color: "#18A0FB",
    zIndex: 2,
  };

  const handleForwardIntroduction = () => {
    if (introductionIndex < introductionStyles.length - 1) {
      setIntroductionIndex(introductionIndex + 1);
    }
  };

  return (
    <div style={fullscreensection}>
      <button style={signInButtonStyle} onClick={() => navigate("/login")}>
        Sign In
      </button>

      <div style={introductionStyles[introductionIndex]}>
        <p>M J U</p>
        <p>Computer Engineering</p>
        <p>S T U D Y -</p>
        <p>
          M A P <span style={ellipseStyle}></span>
        </p>
      </div>
      <div style={photostyle}></div>
      <div style={scrollsection}>
        <div style={imageStyle}>
          <img src={altimage1} alt="맵 사진 1" style={altImageStyle} />
          <img src={altimage2} alt="맵 사진 2" style={altImageStyle} />
          <img src={altimage3} alt="맵 사진 3" style={altImageStyle} />
        </div>
      </div>
    </div>
  );
};

export default Main;
