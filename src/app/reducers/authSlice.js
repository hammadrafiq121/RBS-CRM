import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../services/authApi";

//get the user from local storage
const user = JSON.parse(localStorage.getItem("user"));

//initial state of slice
const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//register user
export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      return await authApi.signup(user);
    } catch (error) {
      //multiple checks for error
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authApi.login(user);
  } catch (error) {
    //multiple checks for error
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
});

//create a auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
