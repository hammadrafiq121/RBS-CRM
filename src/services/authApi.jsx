import axios from "axios";

const backendUrl = "http://localhost:3000";

//register
export const signup = async (userData) => {
  const response = await axios.post(`${backendUrl}/api/user/signup`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//login
export const login = async (userData) => {
  const response = await axios.post(`${backendUrl}/api/user/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//logout
export const logout = async () => {
  try {
    localStorage.removeItem("user");

    return { message: "User logged out successfully" };
  } catch (error) {
    throw new Error("Failed to log out user");
  }
};

const authApi = {
  signup,
  logout,
  login,
};
export default authApi;
