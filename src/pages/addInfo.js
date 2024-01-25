import React from "react";
import "./addInfo.css";

const AddInfo = ({ setModalOpen }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  const finishForm = () => {
    closeModal();
    //서버에 제출 및 검증 후 notice페이지로 이동
  };
  return (
    <div className="info">
      <div className="info-modal">
        <div className="add-modal-content">
          <h1>사용자 확인</h1>
          <div className="forms">
            <div className="nickname">
              <span className="addTextStyle">닉네임</span>
              <input />
            </div>
            <div className="number">
              <span className="addTextStyle">학번</span>
              <input className="inputNumber" />
            </div>
            <button className="finishBtn" onClick={finishForm}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInfo;
