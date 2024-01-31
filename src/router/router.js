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
//import CallbackPage from "../pages/callback";
import CallbackKakao from "../pages/callbackKakao";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/write" element={<Write />} />
        <Route path="/read" element={<Read />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallerywrite" element={<GalleryWrite />} />
        <Route path="/galleryread" element={<GalleryRead />} />        
        <Route path="/oauth2/login/kakao" element={<CallbackKakao />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};
export default Router;

/*<Route path="/oauth2/login/naver" element={<CallbackNaver />} />  */