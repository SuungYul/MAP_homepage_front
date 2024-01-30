import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/main";
import Notice from "../pages/notice";
import Calendar from "../pages/calendar";
import Gallery from "../pages/gallery";
import Header from "../pages/header";
import Footer from "../pages/footer";
import CallbackNaver from "../pages/callbackNaver";
import CallbackKakao from "../pages/callbackKakao";
import Login from "../pages/login";
import { useState } from "react";

const Router = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/photo" element={<Gallery />} />
        <Route path="/oauth2/login/naver" element={<CallbackNaver />} />
        <Route path="/oauth2/login/kakao" element={<CallbackKakao />} />
        <Route path="/login" element={<Login setModalOpen={setModalOpen} />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};
export default Router;
