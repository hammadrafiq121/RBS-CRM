import axios from "axios";
import store from "../app/store";

const backendUrl = "http://localhost:3000";

export const getUsers = async () => {
  try {
    const { token } = store.getState().auth.user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(`${backendUrl}/api/user/all`, config);
  } catch (error) {
    console.log(`Error while calling get customer api ${error}`);
  }
};

const userApi = {
  getUsers,
};
export default userApi;
