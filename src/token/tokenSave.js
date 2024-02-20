export default function tokenSave(accessToken) {
  const now = Date.now();

  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("savedTime", now);
}
