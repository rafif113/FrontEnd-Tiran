import { createSlice } from "@reduxjs/toolkit";
import { getReportUnit, getReportBarangIn, getReportBarangOut, getReportPart, getReportStock } from "./thunk";
export const initialState = {
  unit: [],
  barangIn: [],
  barangOut: [],
  part: [],
  loadingUnit: true,
  loadingBarangIn: true,
  loadingBarangOut: true,
  stock: [],
  error: {},
};

const ReportSlice = createSlice({
  name: "ReportSlice",
  initialState,
  reducers: {
    setLoadingUnit: (state, action) => {
      state.loadingUnit = action.payload;
    },
    setLoadingBarangIn: (state, action) => {
      state.loadingBarangIn = action.payload;
    },
    setLoadingBarangOut: (state, action) => {
      state.loadingBarangOut = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReportUnit.fulfilled, (state, action) => {
      state.unit = action.payload.message;
    });

    builder.addCase(getReportBarangIn.fulfilled, (state, action) => {
      state.barangIn = action.payload.data;
    });

    builder.addCase(getReportBarangOut.fulfilled, (state, action) => {
      state.barangOut = action.payload.data;
    });

    builder.addCase(getReportPart.fulfilled, (state, action) => {
      state.part = action.payload.message;
    });
    builder.addCase(getReportStock.fulfilled, (state, action) => {
      state.stock = action.payload.data;
    });
  },
});
export const { setLoadingUnit, setLoadingBarangIn, setLoadingBarangOut } = ReportSlice.actions;

export default ReportSlice.reducer;
