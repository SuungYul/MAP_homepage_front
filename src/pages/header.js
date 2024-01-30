import React, { useState } from "react";
import Login from "./login";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="group">
        <div className="logo" />
        <div
          className="text"
          onClick={() => {
            localStorage.getItem("access_token")
              ? navigate("/notice")
              : navigate("/");
          }}
        >
          MAP MJU
        </div>
      </div>
      <div className="group">
        <div className="menu" onClick={() => setModalOpen(true)}>
          Start
        </div>
        <div className="menu" onClick={() => navigate("/notice")}>
          Notice
        </div>
        <div className="menu" onClick={() => navigate("/calendar")}>
          Calendar
        </div>
        <div className="menu" onClick={() => navigate("/photo")}>
          Photo
        </div>
        <div className="menu">MyPage</div>
      </div>
      {modalOpen && <Login setModalOpen={setModalOpen} />}
    </header>
  );
};

export default Header;
