import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getFinancePo as getFinancePoApi,
  getFinanceTongkang as getFinanceTongkangApi,
  postFinanceTongkang as postFinanceTongkangApi,
  postFinanceTongkangDown as postFinanceTongkangDownApi,
  postFinanceTongkangPayment as postFinanceTongkangPaymentApi,
  postFinanceTongkangPort as postFinanceTongkangPortApi,
} from "../../helpers/backend_helper";

export const getFinancePo = createAsyncThunk("finance/getFinancePo", async () => {
  try {
    const response = getFinancePoApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailFinancePo = createAsyncThunk("finance/getDetailFinancePo", async (data) => {
  try {
    const response = getFinancePoApi(data);
    console.log(response);

    return response;
  } catch (error) {
    return error;
  }
});

export const getFinanceTongkang = createAsyncThunk("finance/getFinanceTongkang", async () => {
  try {
    const response = getFinanceTongkangApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailFinanceTongkang = createAsyncThunk("finance/getDetailFinanceTongkang", async (data) => {
  try {
    const response = getFinanceTongkangApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const addFinanceTongkang = createAsyncThunk("finance/addFinanceTongkang", async (tongkang) => {
  try {
    const response = postFinanceTongkangApi(tongkang);
    const data = await response;
    toast.success("Tongkang Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Tongkang Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const addFinanceTongkangPayment = createAsyncThunk("finance/addFinanceTongkangPayment", async (tongkang) => {
  try {
    const response = postFinanceTongkangPaymentApi(tongkang);
    const data = await response;
    toast.success("Tongkang Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Tongkang Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const addFinanceTongkangDown = createAsyncThunk("finance/addFinanceTongkangDown", async (tongkang) => {
  try {
    const response = postFinanceTongkangDownApi(tongkang);
    const data = await response;
    toast.success("Tongkang Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Tongkang Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const addFinanceTongkangPort = createAsyncThunk("finance/addFinanceTongkangPort", async (tongkang) => {
  try {
    const response = postFinanceTongkangPortApi(tongkang);
    const data = await response;
    toast.success("Tongkang Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Tongkang Added Failed", { autoClose: 3000 });
    return error;
  }
});