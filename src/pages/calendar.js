import React from "react";
import "./calendar.css";

const Calendar = () => {
  return (
    <div className="Calendar">
      <div className="Rectangle-ImageBlock"></div>
      <div className="Rectangle"></div>
      <div className="Header">
        <div className="CALENDAR">C A L E N D A R</div>
        <button className="addButton">일정추가</button>
      </div>
    </div>
  );
};

export default Calendar;
