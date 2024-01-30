import { useNavigate } from "react-router-dom";
import React from "react";
import {NavLink} from "react-router-dom";
import "./write.css";
import plus from "../images/plus.jpg";



const Write = () =>{
    const navigate = useNavigate();

    return(
        <div>

        <div className="nbcontainer">
            <div className="notice">N O T I C E</div>
            <button className="writeButton" onClick={() => navigate("/notice")}>등록</button>
        </div>

        <div className="texts" id="title">제목</div>
        <div className="texts" id="content">내용</div>
        <div className="texts" id="addfile">첨부파일</div>            
        <input className="titleBox" type="text" placeholder="제목을 입력해주세요"></input>
        <input className="contentBox" type="text" placeholder="본문을 입력해주세요"></input>
        <button className="addfileButton" onClick={() => navigate("/notice")}> 업로드 </button>
            </div>
        
    );
    
};

export default Write;
