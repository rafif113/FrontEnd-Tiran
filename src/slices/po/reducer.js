import { createSlice } from "@reduxjs/toolkit";
import { addPo, getPo, getDetailPo, getPoLogistik, getDetailPoLogistik } from "./thunk";
export const initialState = {
  po: [],
  detailPo: [],
  poLogistik: [],
  detailPoLogistik: [],
  loading: true,
  loadingDetail: true,
  loadingDetailLogistik: true,
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
  },
  extraReducers: (builder) => {
    // Start po reducer
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
} = PoSlice.actions;

export default PoSlice.reducer;
