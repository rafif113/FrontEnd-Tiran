import { createSlice } from "@reduxjs/toolkit";
import { getBarang, addBarang, addKategori, getKategoriBarang, getMasterBarang } from "./thunk";
export const initialState = {
  barang: [],
  masterBarang: [],
  kategoriBarang: [],
  error: {},
};

const BarangSlice = createSlice({
  name: "BarangSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    // Start Barang reducer
    builder.addCase(getBarang.fulfilled, (state, action) => {
      state.barang = action.payload.data;
    });

    // builder.addCase(getBarang.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });

    builder.addCase(addBarang.fulfilled, (state, action) => {
      state.barang.push(action.payload);
    });
    // End Barang reducer

    // Start Master Barang Reducer
    builder.addCase(getMasterBarang.fulfilled, (state, action) => {
      state.masterBarang = action.payload.data;
    });

    builder.addCase(getMasterBarang.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    // End Master Barang Reducer

    // Start Barang reducer
    builder.addCase(getKategoriBarang.fulfilled, (state, action) => {
      state.kategoriBarang = action.payload.data;
    });

    builder.addCase(getKategoriBarang.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addKategori.fulfilled, (state, action) => {
      state.kategoriBarang.push(action.payload);
    });

    builder.addCase(addKategori.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    // End Barang reducer
  },
});

export default BarangSlice.reducer;
