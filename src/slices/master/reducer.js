import { createSlice } from "@reduxjs/toolkit";
import { getMasterAlat, getMasterPart } from "./thunk";
export const initialState = {
  alat: [],
  part: [],
  error: {},
};

const MasterSlice = createSlice({
  name: "MasterSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMasterAlat.fulfilled, (state, action) => {
      state.alat = action.payload;
    });
    builder.addCase(getMasterPart.fulfilled, (state, action) => {
      state.part = action.payload;
    });
  },
});
// export const { setLoading, setLoadingDetail, clearDetailKttPo } = MasterSlice.actions;

export default MasterSlice.reducer;
