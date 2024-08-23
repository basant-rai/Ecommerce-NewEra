import Cookies from "js-cookie"

export const useAuth = () => {
  const accessToken = Cookies.get("accessToken");
  return { accessToken };
}