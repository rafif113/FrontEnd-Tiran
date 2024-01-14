import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {},
  role: "",
  token: {},
  userData: {},
  // role: "admin",
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.data;
      state.loading = true;
      state.isUserLogout = false;
      state.errorMsg = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user.email;
      state.userData = action.payload.user;
      state.role = action.payload.roles;
      state.token = action.payload.token;
      state.loading = false;
      state.errorMsg = false;
    },
    logoutUserSuccess(state, action) {
      state.isUserLogout = true;
      state.user = {};
      state.role = "";
      state.token = {};
    },
    reset_login_flag(state) {
      state.error = null;
      state.loading = false;
      state.errorMsg = false;
    },
    changeRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const { apiError, loginSuccess, logoutUserSuccess, reset_login_flag, changeRole } = loginSlice.actions;

export default loginSlice.reducer;
