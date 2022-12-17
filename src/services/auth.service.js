import { helpHttp } from "../helpers/helpHttp";

const api = helpHttp();
let url = process.env.REACT_APP_PROD_API_URL || "http://localhost:9000/api/v1";

const login = async (data) => {
  let options = {
    body: data,
    headers: {
      "content-type": "application/json"
    }
  }
  const res = await api.post(`${url}/login`, options);
  if (!res.err) {
    if (res.user.email) {
      localStorage.setItem("user", JSON.stringify(res.user));
    }
  }
  return res;
}

const logout = async () => {
  let options = {
    headers: {
      "content-type": "application/json"
    }
  }
  const res = await api.post(`${url}/logout`, options);
  if (!res.err) {
    localStorage.removeItem("user");
  }
  return res;
}

const register = async (data) => {
  let options = {
    body: data,
    headers: {
      "content-type": "application/json"
    }
  }
  const res = await api.post(`${url}/signup`, options);
  return res;
}

const getCurrentUser = async () => {
  let options = {
    headers: {
      "content-type": "application/json"
    }
  }
  const res = await api.get(`${url}/is-logged`, options);
  if (res.status === 403 || res.status === 401) {
    localStorage.removeItem("user");
  }
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
}

const AuthService = {
  login,
  logout,
  register,
  getCurrentUser
}

export default AuthService;