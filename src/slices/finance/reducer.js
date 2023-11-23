import { createSlice } from "@reduxjs/toolkit";
import { getDetailFinancePo, getFinancePo, getFinanceTongkang, getDetailFinanceTongkang } from "./thunk";
export const initialState = {
  invoicePo: [],
  detailInvoicePo: [],
  tongkang: [],
  detailTongkang: [],
  loading: true,
  loadingDetail: true,
  error: {},
};

const FinanceSlice = createSlice({
  name: "FinanceSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingDetail: (state, action) => {
      state.loadingDetail = action.payload;
    },
    clearDetailInvoicePo: (state) => {
      state.detailInvoicePo = null;
    },
    clearDetailTongkang: (state) => {
      state.detailTongkang = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFinancePo.fulfilled, (state, action) => {
      state.invoicePo = action.payload.data;
    });

    builder.addCase(getDetailFinancePo.fulfilled, (state, action) => {
      state.detailInvoicePo = action.payload;
    });

    builder.addCase(getFinanceTongkang.fulfilled, (state, action) => {
      console.log(action);
      state.tongkang = action.payload.message;
    });

    builder.addCase(getDetailFinanceTongkang.fulfilled, (state, action) => {
      state.detailTongkang = action.payload.data;
    });
  },
});
export const { clearDetailInvoicePo, setLoading, setLoadingDetail, clearDetailTongkang } = FinanceSlice.actions;

export default FinanceSlice.reducer;
