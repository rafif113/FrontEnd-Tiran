import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addPenawaran as addPenawaranApi,
  getPenawaran as getPenawaranApi,
  tambahPenawaran as tambahPenawaranApi,
  tunjukPenawaran as tunjukPenawaranApi,
  postPricePenawaran as postPricePenawaranApi,
  getPenawaranPemenang as getPenawaranPemenangApi,
  addPemenangInvoice as addPemenangInvoiceApi,
  addDo as addDoApi,
  getPenawaranPq as getPenawaranPqApi,
} from "../../helpers/backend_helper";

export const addPenawaran = createAsyncThunk("penawaran/addPenawaran", async (penawaran) => {
  try {
    const response = addPenawaranApi(penawaran);
    const data = await response;
    toast.success("penawaran Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("penawaran Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const getPenawaran = createAsyncThunk("penawaran/getPenawaran", async () => {
  try {
    const response = getPenawaranApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailPenawaran = createAsyncThunk("penawaran/getDetailPenawaran", async (data) => {
  try {
    const response = getPenawaranApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const tambahPenawaran = createAsyncThunk("penawaran/tambahPenawaran", async (penawaran) => {
  try {
    const response = tambahPenawaranApi(penawaran);
    const data = await response;
    toast.success("penawaran Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("penawaran Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const tunjukPenawaran = createAsyncThunk("penawaran/tunjukPenawaran", async (penawaran) => {
  try {
    const response = tunjukPenawaranApi(penawaran);
    const data = await response;
    toast.success("penawaran Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("penawaran Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const addPricePenawaran = createAsyncThunk("penawaran/addPricePenawaran", async (penawaran) => {
  try {
    const response = postPricePenawaranApi(penawaran);
    const data = await response;
    toast.success("penawaran price Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("penawaran price Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const getPenawaranPemenang = createAsyncThunk("penawaran/getPenawaranPemenang", async (data) => {
  try {
    const response = getPenawaranPemenangApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const addPemenangInvoice = createAsyncThunk("penawaran/addPemenangInvoice", async (pemenang) => {
  try {
    const response = addPemenangInvoiceApi(pemenang);
    const data = await response;
    toast.success("pemenang price Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("pemenang price Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const addDo = createAsyncThunk("penawaran/addDo", async (penawaran) => {
  try {
    const response = addDoApi(penawaran);
    const data = await response;
    toast.success("do Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("do Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const getPenawaranPq = createAsyncThunk("penawaran/getPenawaranPq", async () => {
  try {
    const response = getPenawaranPqApi();
    return response;
  } catch (error) {
    return error;
  }
});
