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

const MasterPages = () => {
  useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access_token");
  const [members, setMembers] = useState([
    {
      name: "회원이름",
      grade: "학년",
      studentId: "학번",
      birth: "생년월일",
      email: "이메일",
    },
  ]);

  const handleBan = (userId) => {
    console.log(`User ${userId} is banned.`);
    // 여기에 유저 추방 로직을 추가해주세요.
  };

  const handleGrantAdmin = (userId) => {
    console.log(`Admin rights granted to user ${userId}.`);
    // 여기에 관리자 권한 부여 로직을 추가해주세요.
  };

  const handleRevokeAdmin = (userId) => {
    console.log(`Admin rights revoked from user ${userId}.`);
    // 여기에 관리자 권한 삭제 로직을 추가해주세요.
  };
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
      <div className="member-list">
        {members.map((member, index) => (
          <div key={index} className="member-item">
            <p>
              <strong>이름:</strong> {member.name} |<strong>학년:</strong>{" "}
              {member.grade} |<strong>학번:</strong> {member.studentId} |
              <strong>생년월일:</strong> {member.birth} |
              <strong>이메일:</strong> {member.email}
            </p>
            <div className="button-container">
              <button onClick={() => handleBan(member.studentId)}>
                유저 추방
              </button>
              <button onClick={() => handleGrantAdmin(member.studentId)}>
                관리자 권한 부여
              </button>
              <button onClick={() => handleRevokeAdmin(member.studentId)}>
                관리자 권한 삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasterPages;
