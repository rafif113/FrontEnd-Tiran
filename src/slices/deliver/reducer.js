import { createSlice } from "@reduxjs/toolkit";
import { getVendorKendari, getDetailVendorKendari, getVendorSite, getDetailVendorSite } from "./thunk";
export const initialState = {
  vendorKendari: [],
  detailVendorKendari: [],
  loadingVendorKendari: true,
  loadingDetailVendorKendari: true,
  vendorSite: [],
  detailVendorSite: [],
  loadingVendorSite: true,
  loadingDetailVendorSite: true,
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
    setLoadingVendorSite: (state, action) => {
      state.loadingVendorSite = action.payload;
    },
    setLoadingDetailVendorSite: (state, action) => {
      state.loadingDetailVendorSite = action.payload;
    },
    clearDetailVendorSite: (state) => {
      state.detailVendorSite = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVendorKendari.fulfilled, (state, action) => {
      state.vendorKendari = action.payload.data;
    });

    builder.addCase(getDetailVendorKendari.fulfilled, (state, action) => {
      state.detailVendorKendari = action.payload.data;
    });

    builder.addCase(getVendorSite.fulfilled, (state, action) => {
      state.vendorSite = action.payload.data;
    });

    builder.addCase(getDetailVendorSite.fulfilled, (state, action) => {
      state.detailVendorSite = action.payload.data;
    });
  },
});
export const {
  clearDetailVendorKendari,
  setLoadingDetailVendorKendari,
  setLoadingVendorKendari,
  clearDetailVendorSite,
  setLoadingDetailVendorSite,
  setLoadingVendorSite,
} = DeliverSlice.actions;

export default DeliverSlice.reducer;
