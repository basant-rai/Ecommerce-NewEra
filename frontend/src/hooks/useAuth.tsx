import Cookies from "js-cookie"

export const useAuth = () => {
  const accessToken = Cookies.get("accessToken");
  const role = Cookies.get("role");
  const userId = Cookies.get("userId")

  return { accessToken, role, userId };
}

export const useLogout = () => {
  Cookies.remove("userId")
  Cookies.remove("role")
  Cookies.remove("accessToken")
  return true
}