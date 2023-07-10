import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice.js";
import customersReducer from "./reducers/customersSlice.js";
import userReducer from "./reducers/userSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    customers: customersReducer,
  },
  devTools: true,
});

export default store;
