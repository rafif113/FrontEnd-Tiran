import { createSlice } from "@reduxjs/toolkit";
import {
  getMol,
  addMol,
  addComponentGroup,
  addCostCode,
  addMaterialType,
  getComponentGroup,
  getCostCode,
  getMaterialType,
  getDetailMol,
} from "./thunk";
export const initialState = {
  mol: [],
  detailMol: [],
  componentGroup: [],
  costCode: [],
  materialType: [],
  // selectedPartRequest: [],
  error: {},
};

const MolSlice = createSlice({
  name: "MolSlice",
  initialState,
  reducers: {
    setDetailMol: (state, action) => {
      state.detailMol = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearDetailMol: (state) => {
      state.detailMol = null;
    },
    // setSelectedPartRequest: (state, action) => {
    //   state.selectedPartRequest = action.payload;
    // },
    // clearSelectedPartRequest: (state) => {
    //   state.selectedPartRequest = null;
    // },
  },
  extraReducers: (builder) => {
    // Start MOL reducer
    builder.addCase(getMol.fulfilled, (state, action) => {
      state.mol = action.payload.data;
    });

    builder.addCase(getMol.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addMol.fulfilled, (state, action) => {
      state.mol.push(action.payload);
    });

    builder.addCase(addMol.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getDetailMol.fulfilled, (state, action) => {
      state.detailMol = action.payload.data;
    });

    builder.addCase(getDetailMol.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    // End Mol reducer

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
    // End Component Group reducer

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
export const {
  clearDetailMol,
  setDetailMol,
  setLoading,
  // setSelectedPartRequest, clearSelectedPartRequest
} = MolSlice.actions;

export default MolSlice.reducer;
