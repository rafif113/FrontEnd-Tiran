import { createSlice } from "@reduxjs/toolkit";
import { getRole, getUser, getUserDetail } from "./thunk";
export const initialState = {
  user: [],
  detailUser: [],
  role: [],
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    clearDetailUser: (state) => {
      state.detailUser = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.message;
    });
    builder.addCase(getUserDetail.fulfilled, (state, action) => {
      state.detailUser = action.payload.message;
    });

    builder.addCase(getRole.fulfilled, (state, action) => {
      state.role = action.payload.message;
    });
  },
});
export const { clearDetailUser } = UserSlice.actions;

export default UserSlice.reducer;
