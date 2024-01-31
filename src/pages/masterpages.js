import { useNavigate } from "react-router-dom";
import React from "react";
import "./masterpages.css";



const MasterPages = () =>{
    const navigate = useNavigate();

    return(
        <div>
        <div className="nbcontainer">
            <div className="notice">N O T I C E</div>
            <button className="manageButton" onClick={() => navigate("/notice")}>회원관리</button>
        </div>
        <div id="name">이름</div>
        <div id="bolt1" >
            <div onClick={() => navigate("/")}>설정</div>
            </div>
        <div id="fakename">닉네임</div>
        <div id="bolt2"onClick={() => navigate("/")} ></div>
        <div id="birth">생년월일</div>
        <div id="bolt3" onClick={() => navigate("/")}></div>
        <div id="email">이메일</div>
        <div id="bolt4" onClick={() => navigate("/")}></div>
        <div id="phonenumber">전화번호</div>
        <div id="shcoolnumber">학번</div>
        <div id="mytitle">내가 쓴 글</div>
        <button className="writeButton" onClick={() => navigate("/notice")}>MORE</button>
    
        <div></div>
    <div id="namedata">윤동주</div>
    <div id="fakenamedata">윤동주</div>
    <div id="birthdata">2004.01.28</div>
    <div id= "emaildata">antdny2280@naver.com</div>
    <div id="phonenumberdata">010-6659-2280</div>
    <div id="schoolnumberdata">60232851</div>
    <div id="mytitledata">1.djlkasdklmasklsadnk</div>
        </div>
    );
    
};

export default MasterPages;
