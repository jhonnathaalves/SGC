import { api, requestConfig } from "../Utils/Config";
import { createSession } from '../services/api';

// Register a user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      sessionStorage.setItem("user", JSON.stringify(res));
      //console.log(res.headers.authorization);
      //
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Logout a user
const logout = () => {
  sessionStorage.clear();
};

// Sign in a user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {   
    const response = await createSession(data)   
    const loggedUser = response.data;
    const token = response.headers.authorization;
    const id = response.data.id;   

    if (!token) {
      console.log("No token provided");
    }

    if (response) {
      sessionStorage.clear();
      sessionStorage.setItem("user", JSON.stringify(loggedUser));
      sessionStorage.setItem("token", JSON.stringify(token));
      sessionStorage.setItem("id", JSON.stringify(id));
    }

    

    return response;

  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);
    console.log(error.response.status);
    return error;
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;