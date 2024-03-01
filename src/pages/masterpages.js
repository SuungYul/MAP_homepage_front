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
  const id_ = localStorage.getItem("id_");
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
    // 여기에 유저 추방 로직을 추가해주세요.
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    axios
      .delete(
        `${SERVER_URL}/admin/members/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        tokenSave(response.headers["access-token"]);
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGrantAdmin = (userId) => {
    // 여기에 관리자 권한 부여 로직을 추가해주세요.
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    axios
      .patch(
        `${SERVER_URL}/admin/members/${userId}/role/admin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        tokenSave(response.headers["access-token"]);
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRevokeAdmin = (userId) => {
    // 여기에 관리자 권한 삭제 로직을 추가해주세요.
    if (!IsAccessTokenValid()) {
      localStorage.clear();
      dispatch(logOut());
      navigate("/login");
    }
    axios
      .patch(
        `${SERVER_URL}/admin/members/${userId}/role/user`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        tokenSave(response.headers["access-token"]);
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
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
        setMembers(response.data.result.memberDetailDTOList);
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
        {members.map(
          (member, index) =>
            member.id != id_ && (
              <div key={index} className="member-item">
                <p>
                  <strong>이름:</strong> {member.name} |<strong>학년:</strong>{" "}
                  {member.grade} |<strong>학번:</strong> {member.studentId} |
                  <strong>생년월일:</strong> {member.birth} |
                  <strong>이메일:</strong> {member.email}
                </p>
                <div className="button-container">
                  <button onClick={() => handleBan(member.id)}>
                    유저 추방
                  </button>
                  <button onClick={() => handleGrantAdmin(member.id)}>
                    관리자 권한 부여
                  </button>
                  <button onClick={() => handleRevokeAdmin(member.id)}>
                    관리자 권한 삭제
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default MasterPages;
