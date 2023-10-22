import { createSlice } from "@reduxjs/toolkit";
import { addFpb, getFpb, getDetailFpb } from "./thunk";
export const initialState = {
  fpb: [],
  detailFpb: [],
  loading: true,
  selectedFpbList: [],
  error: {},
};

const FpbSlice = createSlice({
  name: "FpbSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearDetailFpb: (state) => {
      state.detailFpb = null;
    },
    setSelectedFpbList: (state, action) => {
      state.selectedFpbList = action.payload;
    },
    clearSelectedFpbList: (state) => {
      state.selectedFpbList = null;
    },
  },
  extraReducers: (builder) => {
    // Start FPB reducer
    builder.addCase(getFpb.fulfilled, (state, action) => {
      state.fpb = action.payload.data;
    });

    // builder.addCase(getFpb.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });

    builder.addCase(getDetailFpb.fulfilled, (state, action) => {
      state.detailFpb = action.payload.data;
    });

    // builder.addCase(getDetailFpb.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });

    builder.addCase(addFpb.fulfilled, (state, action) => {
      state.fpb.push(action.payload);
    });

    // builder.addCase(addFpb.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });
    // End FPB reducer
  },
});
export const { clearDetailFpb, clearSelectedFpbList, setLoading, setSelectedFpbList } = FpbSlice.actions;

export default FpbSlice.reducer;