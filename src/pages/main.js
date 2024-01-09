import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const backgroundstyle ={
    backgroundColor: '#000000'
  }

  const introductionstyle = {

    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: '60px',
    lineHeight: '30px',
    letterSpacing: '-0.015em',
    color: '#FFFFFF',
  };

  const imagestyle ={
    display:'inclin-flex',
    justifyContent: 'space-evenly',
    padding: '0px',
    width: '100%'
  }


  return (
    <div style={backgroundstyle}>
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


    <div style={imagestyle}> 
  <img src ="/" alt="맵 사진 1"></img>
  <img src ="/" alt="맵 사진 2"></img>
  <img src ="/" alt="맵 사진 3"></img>
  </div>

    </div>
  );
};

export default Main;
