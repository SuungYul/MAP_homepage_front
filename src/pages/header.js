import React, { useState } from "react";
import Login from "./login";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/actions";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <header className="header">
      <div className="group">
        <div className="logo" />
        <div
          className="text"
          // onClick={() => {
          //   localStorage.getItem("access_token")
          //     ? navigate("/notice")
          //     : navigate("/");
          // }}
          onClick={() => navigate("/")}
        >
          MAP MJU
        </div>
      </div>
      <div className="group">
        {isLoggedIn ? (
          <div
            className="menu"
            onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("prevPath");
              dispatch(logOut());
              navigate("/");
            }}
          >
            Logout
          </div>
        ) : (
          <div className="menu" onClick={() => setModalOpen(true)}>
            Login
          </div>
        )}
        <div className="menu" onClick={() => navigate("/notice")}>
          Notice
        </div>
        <div className="menu" onClick={() => navigate("/calendar")}>
          Calendar
        </div>
        <div className="menu" onClick={() => navigate("/gallery")}>
          Photo
        </div>
        <div className="menu" onClick={() => navigate("/mypages")}>
          MyPage
        </div>
      </div>
      {modalOpen && <Login setModalOpen={setModalOpen} />}
    </header>
  );
};

export default Header;
