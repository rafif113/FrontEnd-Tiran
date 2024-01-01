import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addPo as addPoApi,
  getPo as getPoApi,
  getPoLogistik as getPoLogistikApi,
  getProcurementList as getProcurementListApi,
} from "../../helpers/backend_helper";

export const getPo = createAsyncThunk("po/getPo", async () => {
  try {
    const response = getPoApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailPo = createAsyncThunk("po/getDetailPo", async (data) => {
  try {
    const response = getPoApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const addPo = createAsyncThunk("po/addPo", async (po) => {
  try {
    const response = addPoApi(po);
    const data = await response;
    toast.success("po Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("po Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const getPoLogistik = createAsyncThunk("po/getPoLogistik", async () => {
  try {
    const response = getPoLogistikApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailPoLogistik = createAsyncThunk("po/getDetailPoLogistik", async (data) => {
  try {
    const response = getPoLogistikApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const getProcurementList = createAsyncThunk("po/getProcurementList", async () => {
  try {
    const response = getProcurementListApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailProcurementList = createAsyncThunk("po/getDetailProcurementList", async (data) => {
  try {
    const response = getProcurementListApi(data);
    return response;
  } catch (error) {
    return error;
  }
});
