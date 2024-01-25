import { createSlice } from "@reduxjs/toolkit";
import { getKttPo, getDetailKttPo } from "./thunk";
export const initialState = {
  kttPo: [],
  detailKttPo: [],
  loading: true,
  loadingDetail: true,
  error: {},
};

const KttSlice = createSlice({
  name: "KttSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearDetailKttPo: (state) => {
      state.detailKttPo = null;
    },
    setLoadingDetail: (state, action) => {
      state.loadingDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getKttPo.fulfilled, (state, action) => {
      state.kttPo = action.payload.data;
    });
    builder.addCase(getDetailKttPo.fulfilled, (state, action) => {
      state.detailKttPo = action.payload.data;
    });
  },
});
export const { setLoading, setLoadingDetail, clearDetailKttPo } = KttSlice.actions;

export default KttSlice.reducer;
