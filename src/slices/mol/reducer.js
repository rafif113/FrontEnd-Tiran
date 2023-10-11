import { createSlice } from "@reduxjs/toolkit";
import { addComponentGroup, addCostCode, addMaterialType, getComponentGroup, getCostCode, getMaterialType } from "./thunk";
export const initialState = {
  componentGroup: [],
  costCode: [],
  materialType: [],
  error: {},
};

const MolSlice = createSlice({
  name: "MolSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    // Start Component Group reducer
    builder.addCase(getComponentGroup.fulfilled, (state, action) => {
      state.componentGroup = action.payload.data;
    });

    builder.addCase(getComponentGroup.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addComponentGroup.fulfilled, (state, action) => {
      state.componentGroup.push(action.payload);
    });

    builder.addCase(addComponentGroup.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    // End Barang reducer

    // Start Cost Code Reducer
    builder.addCase(getCostCode.fulfilled, (state, action) => {
      state.costCode = action.payload.data;
    });

    builder.addCase(getCostCode.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addCostCode.fulfilled, (state, action) => {
      state.costCode.push(action.payload);
    });

    builder.addCase(addCostCode.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    // End Cost Code Reducer

    // Start Material Type reducer
    builder.addCase(getMaterialType.fulfilled, (state, action) => {
      state.materialType = action.payload.data;
    });

    builder.addCase(getMaterialType.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addMaterialType.fulfilled, (state, action) => {
      state.materialType.push(action.payload);
    });

    builder.addCase(addMaterialType.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    // End Material Type reducer
  },
});

export default MolSlice.reducer;
