import { createSlice } from "@reduxjs/toolkit";
import { getBarang } from "./thunk";
export const initialState = {
  barang: [],
  error: {},
};

const BarangSlice = createSlice({
  name: "BarangSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getBarang.fulfilled, (state, action) => {
      state.barang = action.payload.data;
    });

    builder.addCase(getBarang.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default BarangSlice.reducer;
