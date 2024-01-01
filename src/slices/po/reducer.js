import { createSlice } from "@reduxjs/toolkit";
import {
  addPo,
  getPo,
  getDetailPo,
  getPoLogistik,
  getDetailPoLogistik,
  getProcurementList,
  getDetailProcurementList,
} from "./thunk";
export const initialState = {
  po: [],
  detailPo: [],
  poLogistik: [],
  detailPoLogistik: [],
  procurementList: [],
  detailProcurementList: [],
  loading: true,
  loadingDetail: true,
  loadingPoLogistik: true,
  loadingDetailLogistik: true,
  loadingProcurementList: true,
  loadingDetailProcurementList: true,
  selectedPoList: [],
  error: {},
};

const PoSlice = createSlice({
  name: "PoSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingDetail: (state, action) => {
      state.loadingDetail = action.payload;
    },
    setLoadingDetailLogistik: (state, action) => {
      state.loadingDetailLogistik = action.payload;
    },
    clearDetailPo: (state) => {
      state.detailPo = null;
    },
    clearDetailPoLogistik: (state) => {
      state.detailPoLogistik = null;
    },
    setSelectedPoList: (state, action) => {
      state.selectedPoList = action.payload;
    },
    clearSelectedPoList: (state) => {
      state.selectedPoList = null;
    },
    setLoadingPoLogistik: (state, action) => {
      state.loadingPoLogistik = action.payload;
    },
    setLoadingProcurementList: (state, action) => {
      state.loadingProcurementList = action.payload;
    },
    setLoadingDetailProcurementList: (state, action) => {
      state.loadingDetailProcurementList = action.payload;
    },
    clearDetailProcurementList: (state) => {
      state.detailProcurementList = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPo.fulfilled, (state, action) => {
      state.po = action.payload.data;
    });

    builder.addCase(getDetailPo.fulfilled, (state, action) => {
      state.detailPo = action.payload.data;
    });

    builder.addCase(addPo.fulfilled, (state, action) => {
      state.po.push(action.payload);
    });

    builder.addCase(getPoLogistik.fulfilled, (state, action) => {
      state.poLogistik = action.payload.data;
    });
    builder.addCase(getDetailPoLogistik.fulfilled, (state, action) => {
      state.detailPoLogistik = action.payload.data;
    });

    builder.addCase(getProcurementList.fulfilled, (state, action) => {
      state.procurementList = action.payload.data;
    });

    builder.addCase(getDetailProcurementList.fulfilled, (state, action) => {
      state.detailProcurementList = action.payload.data;
    });
  },
});
export const {
  clearDetailPo,
  clearSelectedPoList,
  setLoading,
  setSelectedPoList,
  setLoadingDetail,
  setLoadingDetailLogistik,
  clearDetailPoLogistik,
  clearDetailProcurementList,
  setLoadingDetailProcurementList,
  setLoadingProcurementList,
  setLoadingPoLogistik,
} = PoSlice.actions;

export default PoSlice.reducer;
