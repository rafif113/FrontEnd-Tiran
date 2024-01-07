import { createSlice } from "@reduxjs/toolkit";
import {
  getDetailFinancePo,
  getFinancePo,
  getFinanceTongkang,
  getDetailFinanceTongkang,
  getCartProcurementList,
  postRecapCart,
} from "./thunk";
export const initialState = {
  invoicePo: [],
  cartPaymentRequest: [],
  detailInvoicePo: [],
  tongkang: [],
  detailTongkang: [],
  loading: true,
  loadingDetail: true,
  loadingPaymentRequest: true,
  loadingDetailPaymentRequest: true,
  loadingCartPaymentRequest: true,
  loadingTongkang: true,
  loadingDetailTongkang: true,
  recapCart: [],
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
    setLoadingPaymentRequest: (state, action) => {
      state.loadingPaymentRequest = action.payload;
    },
    setLoadingDetailPaymentRequest: (state, action) => {
      state.loadingDetailPaymentRequest = action.payload;
    },
    setLoadingCartPaymentRequest: (state, action) => {
      state.loadingCartPaymentRequest = action.payload;
    },
    setLoadingTongkang: (state, action) => {
      state.loadingTongkang = action.payload;
    },
    setLoadingDetailTongkang: (state, action) => {
      state.loadingDetailTongkang = action.payload;
    },
    clearDetailInvoicePo: (state) => {
      state.detailInvoicePo = null;
    },
    clearDetailTongkang: (state) => {
      state.detailTongkang = null;
    },
    clearRecapCart: (state) => {
      state.recapCart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFinancePo.fulfilled, (state, action) => {
      const data = action.payload.data;
      const paymentRequest = data.filter((item) => item.flag == 0);
      state.invoicePo = paymentRequest;
    });

    builder.addCase(getCartProcurementList.fulfilled, (state, action) => {
      state.cartPaymentRequest = action.payload.data;
    });

    builder.addCase(getDetailFinancePo.fulfilled, (state, action) => {
      state.detailInvoicePo = action.payload;
    });

    builder.addCase(getFinanceTongkang.fulfilled, (state, action) => {
      state.tongkang = action.payload.message;
    });

    builder.addCase(getDetailFinanceTongkang.fulfilled, (state, action) => {
      state.detailTongkang = action.payload.data;
    });

    builder.addCase(postRecapCart.fulfilled, (state, action) => {
      state.recapCart = action.payload.data;
    });
  },
});
export const {
  clearDetailInvoicePo,
  setLoading,
  setLoadingDetail,
  clearDetailTongkang,
  setLoadingPaymentRequest,
  setLoadingDetailPaymentRequest,
  setLoadingTongkang,
  setLoadingDetailTongkang,
  setLoadingCartPaymentRequest,
  clearRecapCart,
} = FinanceSlice.actions;

export default FinanceSlice.reducer;
