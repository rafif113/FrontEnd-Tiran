import { createSlice } from "@reduxjs/toolkit";
import { getMasterAlat, getMasterPart } from "./thunk";
export const initialState = {
  alat: [],
  part: [],
  loadingAlat: true,
  error: {},
};

const MasterSlice = createSlice({
  name: "MasterSlice",
  initialState,
  reducers: {
    setLoadingALat: (state, action) => {
      state.loadingAlat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMasterAlat.fulfilled, (state, action) => {
      state.alat = action.payload;
    });
    builder.addCase(getMasterPart.fulfilled, (state, action) => {
      state.part = action.payload;
    });
  },
});
export const { setLoadingALat } = MasterSlice.actions;

export default MasterSlice.reducer;
