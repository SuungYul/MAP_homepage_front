import { useNavigate } from "react-router-dom";
import "./main.css";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div>
      Main
      <button onClick={() => navigate("/notice")}>notice</button>
      
      <button id="LoginButton"onClick={() => navigate("/login")}>Sign in</button>

      <a id="Introduction" > 
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

      </a>

  <img src ="/" alt="맵 사진 1"></img>
  <img src ="/" alt="맵 사진 2"></img>
  <img src ="/" alt="맵 사진 3"></img>

    </div>
  );
};

export default Main;
