import React, { useEffect } from "react";
import { Calendar as MyCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../redux/useAuth";
const localizer = momentLocalizer(moment);
const Calendar = () => {
  useAuth();
  const navigate = useNavigate();

  const events = [
    {
      start: new Date(),
      end: new Date(moment().add(1, "days")),
      title: "Sample Event",
    },
    // more events...
  ];
  return (
    <div className="Calendar">
      <div className="Header">
        <div className="pageTitle">C A L E N D A R</div>
        <button className="addButton">일정추가</button>
      </div>
      <div>
        <MyCalendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          /* events 배열은 달력에 표시될 이벤트 목록이다. 
        배열의 각 객체는 start, end, 그리고 title 속성을 가져야 한다. */
          style={{
            height: "100vh",
            width: "80%",
            margin: "0 auto",
            paddingTop: "5%",
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
