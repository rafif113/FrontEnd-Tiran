import { createSlice } from "@reduxjs/toolkit";
import { getDetailFinancePo, getFinancePo } from "./thunk";
export const initialState = {
  invoicePo: [],
  detailInvoicePo: [],
  loading: true,
  error: {},
};

const FinancePoSlice = createSlice({
  name: "FinancePoSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearDetailInvoicePo: (state) => {
      state.detailInvoicePo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFinancePo.fulfilled, (state, action) => {
      state.invoicePo = action.payload.data;
    });

    builder.addCase(getDetailFinancePo.fulfilled, (state, action) => {
      state.detailInvoicePo = action.payload;
    });
  },
});
export const { clearDetailInvoicePo, setLoading } = FinancePoSlice.actions;

export default FinancePoSlice.reducer;
