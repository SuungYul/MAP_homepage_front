import { useNavigate } from "react-router-dom";
import myimage from "../MAP_image.png" ;

const Main = () => {
  const navigate = useNavigate();

  const fullscreensection ={
    height: "100vh",
    backgroundColor: '#000000'
    
  }

  const introductionstyle = {
    position:"absolute",
    top: "381px",
    left: "383px",
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
    position:"relative",
    height : '1309px',
  width: '736px',
  left: '1200px',
  top: '80px',
  backgroundImage: `url(${myimage})`,
  backgroundRepeat: 'no-repeat'
  }

  const scrollsection ={
    
    backgroundColor: '#000000',
    height: "50vh"
    
  }

  const imagestyle ={
    position: "absolute",
    bottom: "-100px",
    display:'inclin-flex',
    justifyContent: 'space-evenly',
    padding: '0px',
    width: '100%'
  }


  return (
    <div style={fullscreensection}>
      Main
      <button onClick={() => navigate("/notice")}>notice</button>
      
      <button id="LoginButton"onClick={() => navigate("/login")}>Sign in</button>

      <div style={introductionstyle} > 
      <p>
        M J U
      </p>      

      <p>
        Computer Engineering
      </p>

      <p>
        S T U D Y
      </p>

      <p>
      M A P
      </p>

      </div>

<div style={photostyle}></div>
    <div style={scrollsection}> 
    <div style={imagestyle}>
  <img src ="/" alt="맵 사진 1"></img>
  <img src ="/" alt="맵 사진 2"></img>
  <img src ="/" alt="맵 사진 3"></img>
  </div>
  </div>

    </div>
  );
};

export default Main;
