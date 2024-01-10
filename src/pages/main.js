import { useNavigate } from "react-router-dom";
import myimage from "../MAP_image.png";
import altimage1 from "../altimage1.jpg";
import altimage2 from "../altimage2.jpg";
import altimage3 from "../altimage3.jpg";

const Main = () => {
  const navigate = useNavigate();

  const fullscreensection = {
    height: "100vh",
    backgroundColor: '#000000',
  };

  const ellipseStyle = {
    position: 'absolute',
    width: '25px',
    height: '22px',
    left: '780px',
    top: '730px',
    background: '#FF5050',
    borderRadius: '50%', // 원 모양으로 만들기 위해
  };

  const introductionstyle = {
    position: "absolute",
    top: "381px",
    left: "600px",
    textAlign: "left",
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: '60px',
    lineHeight: '30px',
    letterSpacing: '-0.015em',
    color: '#FFFFFF',
  };

  const photostyle = {
    position: "relative",
    height: '1200px',
    width: '900px',
    left: '1300px',
    top: '80px',
    backgroundImage: `url(${myimage})`,
    backgroundRepeat: 'no-repeat',
  };

  const scrollsection = {
    backgroundColor: '#000000',
    height: "50vh",
  };

  const imageStyle = {
    position: "absolute",
    bottom: "-500px",
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '0px',
    width: '100%',
  };

  const altImageStyle = {
    width: '30%', // 조절 가능한 이미지 크기
  };

  const signInButtonStyle = {
    position: 'absolute',
    width:'150px',
    left: '1100px', // 조절 가능한 위치
    top: '800px', // 조절 가능한 위치
    backgroundColor: '#000000',
    color: 'white',
    padding: '10px 15px',
    border: '1px solid #18A0FB',
    borderRadius: '6px',

    cursor: 'pointer',
    fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '15px',
  lineHeight: '18px',
  alignItems: 'center',
  textAlign: 'center',
  letterSpacing: '-0.015em',
  color: '#18A0FB',
    
  };

  return (
    <div style={fullscreensection}>
      Main
      <button onClick={() => navigate("/notice")}>notice</button>
      <button style={signInButtonStyle} onClick={() => navigate("/login")}>Sign In</button>

      <div style={introductionstyle}>
        <p>M J U</p>
        <p>Computer Engineering</p>
        <p>S T U D Y -</p>
        <p>M A P</p>
      </div>

      <div style={photostyle}></div>

      <div style={scrollsection}>
        <div style={imageStyle}>
          <img src={altimage1} alt="맵 사진 1" style={altImageStyle} />
          <img src={altimage2} alt="맵 사진 2" style={altImageStyle} />
          <img src={altimage3} alt="맵 사진 3" style={altImageStyle} />
        </div>
      </div>

      <div style={ellipseStyle}>.</div>
    </div>
  );
};

export default Main;
