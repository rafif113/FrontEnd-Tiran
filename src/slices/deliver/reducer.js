import { createSlice } from "@reduxjs/toolkit";
import {
  getVendorKendari,
  getDetailVendorKendari,
  getVendorSite,
  getDetailVendorSite,
  getPartSpb,
  getListSpb,
  getDetailSpb,
  getListGrPo,
  getDetailGrPo,
} from "./thunk";
export const initialState = {
  vendorKendari: [],
  detailVendorKendari: [],
  loadingVendorKendari: true,
  loadingDetailVendorKendari: true,
  vendorSite: [],
  detailVendorSite: [],
  loadingVendorSite: true,
  loadingDetailVendorSite: true,
  listSpb: [],
  partSpb: [],
  loadingSpb: true,
  detailSpb: [],
  loadingDetailSpb: true,
  GrPo: [],
  loadingGrPo: true,
  detailGrPo: [],
  loadingDetailGrPo: true,
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
    setLoadingSpb: (state, action) => {
      state.loadingSpb = action.payload;
    },
    clearDetailSpb: (state) => {
      state.detailSpb = null;
    },
    setLoadingDetailSpb: (state, action) => {
      state.loadingDetailSpb = action.payload;
    },
    setLoadingGrPo: (state, action) => {
      state.loadingGrPo = action.payload;
    },
    setLoadingDetailGrPo: (state, action) => {
      state.loadingDetailGrPo = action.payload;
    },
    clearDetailGrPo: (state) => {
      state.detailGrPo = null;
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
      state.detailVendorSite = action.payload;
    });

    builder.addCase(getListSpb.fulfilled, (state, action) => {
      state.listSpb = action.payload.data;
    });

    builder.addCase(getDetailSpb.fulfilled, (state, action) => {
      state.detailSpb = action.payload.data;
    });

    builder.addCase(getPartSpb.fulfilled, (state, action) => {
      state.partSpb = action.payload.data;
    });

    builder.addCase(getListGrPo.fulfilled, (state, action) => {
      state.GrPo = action.payload.data;
    });

    builder.addCase(getDetailGrPo.fulfilled, (state, action) => {
      state.detailGrPo = action.payload.data;
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
  setLoadingSpb,
  clearDetailSpb,
  setLoadingDetailSpb,
  clearDetailGrPo,
  setLoadingDetailGrPo,
  setLoadingGrPo,
} = DeliverSlice.actions;

export default DeliverSlice.reducer;
