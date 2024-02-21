import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/actions";

export default function IsAccessTokenValid() {
  //   const navigate = useNavigate();
  const data = localStorage.getItem("access_token");
  if (!data) {
    return false;
  }

  const savedTime = localStorage.getItem("savedTime");
  const isTokenValid = Date.now() - savedTime < 30 * 60 * 1000; // 토큰이 저장된 시간이 30분 미만이면 토큰이 유효하다고 가정합니다.
  if (!isTokenValid) {
    localStorage.clear();
  }
  return isTokenValid;
  //   if (!isTokenValid) {
  //     logout();
  //   }

  //   function logout() {
  //     localStorage.clear();
  //     dispatch(logOut());
  //     navigate("/login"); // 로그인 페이지로 이동
  //   }
}
