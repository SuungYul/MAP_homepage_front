import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/main";
import Notice from "../pages/notice";
import Calender from "../pages/calender";
import Gallery from "../pages/gallery";
import Header from "../pages/header";
import Footer from "../pages/footer";
import CallbackPage from "../pages/callback";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login/oauth2/code/naver" element={<CallbackPage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};
export default Router;
