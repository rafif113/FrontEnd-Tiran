import { createSlice } from "@reduxjs/toolkit";
import { getPenawaran, getDetailPenawaran, getPenawaranPemenang, getPenawaranPq } from "./thunk";
export const initialState = {
  penawaran: [],
  penawaranPq: [],
  detailPenawaran: [],
  detailPenawaranPemenang: [],
  loading: true,
  loadingDetail: true,
  loadingPenawaranPq: true,
  detailPenawaranPq: [],
  loadingDetailPenawaranPq: [],
  error: {},
};

const PenawaranSlice = createSlice({
  name: "PenawaranSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingDetail: (state, action) => {
      state.loadingDetail = action.payload;
    },
    setLoadingPenawaranPq: (state, action) => {
      state.loadingPenawaranPq = action.payload;
    },
    clearDetailPenawaran: (state) => {
      state.detailPenawaran = null;
    },
    clearDetailPenawaranPemenang: (state) => {
      state.detailPenawaranPemenang = null;
    },
    detailPenawaranPq: (state, action) => {
      state.detailPenawaranPq = action.payload;
    },
    clearDetailPenawaranPq: (state) => {
      state.detailPenawaranPq = null;
    },
    setLoadingDetailPenawaranPq: (state, action) => {
      state.loadingDetailPenawaranPq = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPenawaran.fulfilled, (state, action) => {
      state.penawaran = action.payload;
    });

    builder.addCase(getDetailPenawaran.fulfilled, (state, action) => {
      state.detailPenawaran = action.payload.data;
    });

    builder.addCase(getPenawaranPemenang.fulfilled, (state, action) => {
      state.detailPenawaranPemenang = action.payload.data;
    });

    builder.addCase(getPenawaranPq.fulfilled, (state, action) => {
      state.penawaranPq = action.payload.data;
    });
  },
});
export const {
  clearDetailPenawaran,
  setLoading,
  setLoadingDetail,
  clearDetailPenawaranPemenang,
  setLoadingPenawaranPq,
  clearDetailPenawaranPq,
  detailPenawaranPq,
  setLoadingDetailPenawaranPq,
} = PenawaranSlice.actions;

export default PenawaranSlice.reducer;
