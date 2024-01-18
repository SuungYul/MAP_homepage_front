import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Notice = () => {

  const navigate = useNavigate();

    const writeButtonStyle = {
      position: "absolute",
      width: "7%",
      left: "42%", // 조절 가능한 위치
      top: "60%", // 조절 가능한 위치
      backgroundColor: "#000000",
      color: "white",
      padding: "10px 15px",
      border: "1px solid #18A0FB",
      borderRadius: "6px",
      cursor: "pointer",
      fontFamily: "Montserrat",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "15px",
      lineHeight: "18px",
      alignItems: "center",
      textAlign: "center",
      letterSpacing: "-0.015em",
      color: "#18A0FB",
    };


  return
    (
      <div>

    <div>notice</div>
    <button style={writeButtonStyle} onClick={() => navigate("/login")}>
        Sign In
      </button>
      
      </div>
    
  );
  
};
export default Notice;
