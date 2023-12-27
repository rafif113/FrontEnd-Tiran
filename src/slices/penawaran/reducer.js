import { createSlice } from "@reduxjs/toolkit";
import { getPenawaran, getDetailPenawaran, getPenawaranPemenang } from "./thunk";
export const initialState = {
  penawaran: [],
  detailPenawaran: [],
  detailPenawaranPemenang: [],
  loading: true,
  loadingDetail: true,
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
    clearDetailPenawaran: (state) => {
      state.detailPenawaran = null;
    },
    clearDetailPenawaranPemenang: (state) => {
      state.detailPenawaranPemenang = null;
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
  },
});
export const { clearDetailPenawaran, setLoading, setLoadingDetail, clearDetailPenawaranPemenang } = PenawaranSlice.actions;

export default PenawaranSlice.reducer;
