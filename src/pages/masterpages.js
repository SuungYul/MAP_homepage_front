import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./masterpages.css";
import { useAuth } from "../redux/useAuth";
import axios from "axios";
import { SERVER_URL } from "../config";

const MasterPages = () => {
  useAuth();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    console.log(accessToken);
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
