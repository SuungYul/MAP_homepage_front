import { useNavigate } from "react-router-dom";
import "./main.css";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div>
      Main
      <button onClick={() => navigate("/notice")}>notice</button>
    </div>
  );
};

export default Main;
