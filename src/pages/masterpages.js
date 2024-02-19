import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./masterpages.css";

import axios from "axios";
import { SERVER_URL } from "../config";
import { useAuth } from "../token/useAuth";
import IsAccessTokenValid from "../token/tokenValid";
import tokenSave from "../token/tokenSave";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions";

const MasterPages = () => {
  useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    axios
      .get(`${SERVER_URL}/admin/members`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: "1",
        },
      })
      .then((response) => {
        tokenSave(response.headers["access-token"]);
        console.log(response);
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
    </div>
  );
};

export default MasterPages;
