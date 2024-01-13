import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import myimage from "../MAP_image.png";
import altimage1 from "../altimage1.jpg";
import altimage2 from "../altimage2.jpg";
import altimage3 from "../altimage3.jpg";

const Main = () => {
  const navigate = useNavigate();

  const [introductionIndex, setIntroductionIndex] = useState(0);

  const fullscreensection = {
<<<<<<< HEAD
    height: "100vh",
=======
    // height: "100vh", // 이거때문에 중간에 흰 여백 생기는듯
>>>>>>> 5b15a058aec44910cd73a3a94280644c438926fe
    backgroundColor: "#000000",
  };

  const ellipseStyle = {
<<<<<<< HEAD
    width: "10px",
    height: "10px",
    background: "#FF5050",
    borderRadius: "50%",
    display: "inline-block",
    marginLeft: "5px",  // Adj
=======
    position: "absolute",
    width: "25px",
    height: "22px",
    left: "780px",
    top: "730px",
    background: "#FF5050",
    borderRadius: "50%", // 원 모양으로 만들기 위해
>>>>>>> 5b15a058aec44910cd73a3a94280644c438926fe
  };
  

<<<<<<< HEAD
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
    width: "100%",
    marginLeft: "55%",
    top: "10%",
=======
  const introductionstyle = {
    position: "absolute",
    top: "381px",
    left: "600px",
    textAlign: "left",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 800,
    fontSize: "60px",
    lineHeight: "30px",
    letterSpacing: "-0.015em",
    color: "#FFFFFF",
  };

  const photostyle = {
    position: "relative",
    height: "1200px",
    width: "900px",
    left: "1300px",
    top: "80px",
>>>>>>> 5b15a058aec44910cd73a3a94280644c438926fe
    backgroundImage: `url(${myimage})`,
    backgroundRepeat: "no-repeat",
  };

  const scrollsection = {
    backgroundColor: "#000000",
    height: "50vh",
  };

  const imageStyle = {
    position: "absolute",
<<<<<<< HEAD
    bottom: "-40%",
=======
    bottom: "-500px",
>>>>>>> 5b15a058aec44910cd73a3a94280644c438926fe
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
<<<<<<< HEAD
    width: "7%",
    left: "42%", // 조절 가능한 위치
    top: "60%", // 조절 가능한 위치
=======
    width: "150px",
    left: "1100px", // 조절 가능한 위치
    top: "800px", // 조절 가능한 위치
>>>>>>> 5b15a058aec44910cd73a3a94280644c438926fe
    backgroundColor: "#000000",
    color: "white",
    padding: "10px 15px",
    border: "1px solid #18A0FB",
    borderRadius: "6px",
<<<<<<< HEAD
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
  };

  const handleForwardIntroduction = () => {
    if (introductionIndex < introductionStyles.length - 1) {
      setIntroductionIndex(introductionIndex + 1);
    }
=======

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
>>>>>>> 5b15a058aec44910cd73a3a94280644c438926fe
  };

  return (
    <div style={fullscreensection}>
<<<<<<< HEAD
      Main
      <button onClick={() => navigate("/notice")}>notice</button>
      <button style={signInButtonStyle} onClick={() => navigate("/login")}>
        Sign In
      </button>

      <div style={introductionStyles[introductionIndex]}>
=======
      <button style={signInButtonStyle} onClick={() => navigate("/login")}>
        Sign In
      </button>
      <div style={introductionstyle}>
>>>>>>> 5b15a058aec44910cd73a3a94280644c438926fe
        <p>M J U</p>
        <p>Computer Engineering</p>
        <p>S T U D Y -</p>
        <p>M A P <span style={ellipseStyle}></span></p>
      </div>
      <div style={photostyle}></div>
      <div style={scrollsection}>
        <div style={imageStyle}>
          <img src={altimage1} alt="맵 사진 1" style={altImageStyle} />
          <img src={altimage2} alt="맵 사진 2" style={altImageStyle} />
          <img src={altimage3} alt="맵 사진 3" style={altImageStyle} />
        </div>
      </div>
<<<<<<< HEAD

  
=======
      <div style={ellipseStyle}>.</div>
>>>>>>> 5b15a058aec44910cd73a3a94280644c438926fe
    </div>
  );
};

export default Main;
