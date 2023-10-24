import { createSlice } from "@reduxjs/toolkit";
import { getVendor, getDetailVendor } from "./thunk";
export const initialState = {
  vendor: [],
  detailVendor: [],
  loading: true,
  error: {},
};

const VendorSlice = createSlice({
  name: "VendorSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearDetailVendor: (state) => {
      state.detailVendor = null;
    },
  },
  extraReducers: (builder) => {
    // Start vendor reducer
    builder.addCase(getVendor.fulfilled, (state, action) => {
      return {
        ...state,
        vendor: action.payload.map((item) => item.user),
        loading: false, // Set loading to false
      };
    });

    builder.addCase(getDetailVendor.fulfilled, (state, action) => {
      state.detailVendor = action.payload.data;
    });

    // builder.addCase(getVendor.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });

    // builder.addCase(getDetailVendor.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });

    // builder.addCase(addPo.fulfilled, (state, action) => {
    //   state.po.push(action.payload);
    // });

    // builder.addCase(addPo.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });
    // End po reducer
  },
});
export const { clearDetailVendor, setLoading } = VendorSlice.actions;

export default VendorSlice.reducer;
