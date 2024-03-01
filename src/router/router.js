import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/main";
import Notice from "../pages/notice";
import Calendar from "../pages/calendar";
import Gallery from "../pages/gallery";
import GalleryWrite from "../pages/gallerywrite";
import GalleryRead from "../pages/galleryread";
import Header from "../pages/header";
import Footer from "../pages/footer";
import Write from "../pages/write";
import Read from "../pages/read";
import CallbackNaver from "../pages/callbackNaver";
import MyPages from "../pages/mypages";
import MasterPages from "../pages/masterpages";
import CallbackKakao from "../pages/callbackKakao";
import Login from "../pages/login";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import GetFeedBack from "../pages/getFeedBack";

const Router = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/write" element={<Write />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallerywrite" element={<GalleryWrite />} />
          <Route path="/galleryread/:id" element={<GalleryRead />} />
          <Route path="/oauth2/login/naver" element={<CallbackNaver />} />
          <Route path="/oauth2/login/kakao" element={<CallbackKakao />} />
          <Route path="/mypages" element={<MyPages />} />
          <Route path="/masterpages" element={<MasterPages />} />
          <Route path="/masterpages/feedback" element={<GetFeedBack />} />
          <Route
            path="/login"
            element={<Login setModalOpen={setModalOpen} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};
export default Router;
