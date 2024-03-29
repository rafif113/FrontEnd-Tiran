import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addFpb as addFpbApi,
  addPq as addPqApi,
  getFpb as getFpbApi,
  getPq as getPqApi,
  getReferensiPart as getReferensiPartApi,
} from "../../helpers/backend_helper";

export const getFpb = createAsyncThunk("fpb/getFpb", async () => {
  try {
    const response = getFpbApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailFpb = createAsyncThunk("fpb/getDetailFpb", async (data) => {
  try {
    const response = getFpbApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const addFpb = createAsyncThunk("fpb/addFpb", async (fpb) => {
  try {
    const response = addFpbApi(fpb);
    const data = await response;
    toast.success("fpb Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("fpb Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const getReferensiPart = createAsyncThunk("fpb/getReferensiPart", async (data) => {
  try {
    const response = getReferensiPartApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const addPq = createAsyncThunk("fpb/addPq", async (pq) => {
  try {
    const response = addPqApi(pq);
    const data = await response;
    toast.success("pq Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("pq Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const getDetailPq = createAsyncThunk("fpb/getDetailPq", async (data) => {
  try {
    const response = getPqApi(data);
    return response;
  } catch (error) {
    return error;
  }
});
