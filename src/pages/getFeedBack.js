import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./masterpages.css";

import axios from "axios";
import { SERVER_URL } from "../config";
import { useAuth } from "../token/useAuth";
import IsAccessTokenValid from "../token/tokenValid";
import tokenSave from "../token/tokenSave";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";

const GetFeedBack = () => {
  useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");
  const [feedBacks, setFeedBacks] = useState([]);

  useEffect(() => {
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    axios
      .get(`${SERVER_URL}/admin/feedbacks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        tokenSave(response.headers["access-token"]);
        setFeedBacks(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="Header">
        <div className="pageTitle">MASTER P A G E</div>
      </div>
      <div className="member-list">
        {feedBacks.map((feedBack, index) => (
          <div key={index} className="member-item">
            <p>{feedBack}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetFeedBack;
