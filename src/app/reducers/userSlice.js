import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../services/userApi";

//initial state of slice
const initialState = {
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//get all users
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await userApi.getUsers();
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//create a auth slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.users = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.users = [];
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Users fetched successfully";
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.users = [];
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
