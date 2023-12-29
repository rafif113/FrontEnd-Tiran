import { createSlice } from "@reduxjs/toolkit";
import { getVendorKendari, getDetailVendorKendari } from "./thunk";
export const initialState = {
  vendorKendari: [],
  detailVendorKendari: [],
  loadingVendorKendari: true,
  loadingDetailVendorKendari: true,
  error: {},
};

const DeliverSlice = createSlice({
  name: "DeliverSlice",
  initialState,
  reducers: {
    setLoadingVendorKendari: (state, action) => {
      state.loadingVendorKendari = action.payload;
    },
    setLoadingDetailVendorKendari: (state, action) => {
      state.loadingDetailVendorKendari = action.payload;
    },
    clearDetailVendorKendari: (state) => {
      state.detailVendorKendari = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVendorKendari.fulfilled, (state, action) => {
      state.vendorKendari = action.payload.data;
    });

    builder.addCase(getDetailVendorKendari.fulfilled, (state, action) => {
      state.detailVendorKendari = action.payload.data;
    });
  },
});
export const { clearDetailVendorKendari, setLoadingDetailVendorKendari, setLoadingVendorKendari } = DeliverSlice.actions;

export default DeliverSlice.reducer;
