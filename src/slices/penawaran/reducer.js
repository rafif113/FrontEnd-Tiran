import { createSlice } from "@reduxjs/toolkit";
import { getPenawaran, getDetailPenawaran } from "./thunk";
export const initialState = {
  penawaran: [],
  detailPenawaran: [],
  loading: true,
  error: {},
};

const PenawaranSlice = createSlice({
  name: "PenawaranSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearDetailPenawaran: (state) => {
      state.detailPenawaran = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPenawaran.fulfilled, (state, action) => {
      state.penawaran = action.payload.data;
    });

    builder.addCase(getDetailPenawaran.fulfilled, (state, action) => {
      state.detailPenawaran = action.payload.data;
    });
  },
});
export const { clearDetailPenawaran, setLoading } = PenawaranSlice.actions;

export default PenawaranSlice.reducer;
