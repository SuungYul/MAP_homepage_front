import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import myimage from "../MAP_image.png";
import altimage1 from "../images/map1.jpg";
import altimage2 from "../images/map2.png";
import altimage3 from "../images/map3.jpg";
import altimage4 from "../images/map4.png";
import altimage5 from "../images/map5.png";
import altimage6 from "../images/map6.png";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../redux/actions";
const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.clear();
    dispatch(logOut());
  }, []);

  const [introductionIndex, setIntroductionIndex] = useState(0);

  const fullscreensection = {
    height: "200vh",
    width: "auto",
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
      textAlign: "left",
      fontFamily: "Montserrat",
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "40px",
      lineHeight: "60%",
      letterSpacing: "-0.015em",
      color: "#FFFFFF",
      zIndex: 1,
    },
    // 추가된 Introduction 스타일들을 여기에 계속 추가할 수 있습니다.
  ];

  const photostyle = {
    position: "absolute",
    height: "90%",
    left: "50%",
    top: "10%",
  };

  const scrollsection = {
    backgroundColor: "#000000",
    height: "50vh",
  };

  const imageStyle = {
    position: "absolute",
    bottom: "-50%",
    display: "flex",
    justifyContent: "space-evenly",
    padding: "0px",
    width: "100%",
  };

  const imageStyle2 = {
    position: "absolute",
    bottom: "-100%",
    display: "flex",
    justifyContent: "space-evenly",
    padding: "0px",
    width: "100%",
  };

  const altImageStyle = {
    width: "30%", // 조절 가능한 이미지 크기
    height: "400px",
  };

  const signInButtonStyle = {
    position: "absolute",
    width: "30%",
    left: "70%", // 조절 가능한 위치
    top: "100%", // 조절 가능한 위치
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
    marginBottom: "20px",
    zIndex: 2,
  };
  const introbox = {
    display: "flex",
    position: "absolute",
    top: "29%",
    left: "20%",
    minWidth: "500px",
  };

  return (
    <div style={fullscreensection}>
      <div>
        <div style={introbox}>
          <div style={introductionStyles[introductionIndex]}>
            <p>M J U</p>
            <p>Computer Engineering</p>
            <p>S T U D Y</p>
            <p>
              - M A P <div style={ellipseStyle}></div>
            </p>
          </div>
          <button style={signInButtonStyle} onClick={() => navigate("/login")}>
            Sign Up
          </button>
        </div>
        <img src={myimage} style={photostyle}></img>
      </div>

      <div style={scrollsection}>
        <div style={imageStyle}>
          <img src={altimage1} alt="맵 사진 1" style={altImageStyle} />
          <img src={altimage2} alt="맵 사진 2" style={altImageStyle} />
          <img src={altimage3} alt="맵 사진 3" style={altImageStyle} />
        </div>
        <div style={imageStyle2}>
          <img src={altimage4} alt="맵 사진 1" style={altImageStyle} />
          <img src={altimage5} alt="맵 사진 2" style={altImageStyle} />
          <img src={altimage6} alt="맵 사진 3" style={altImageStyle} />
        </div>
      </div>
    </div>
  );
};

export default Main;
