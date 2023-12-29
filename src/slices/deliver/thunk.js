import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getVendorKendari as getVendorKendariApi,
  postCekVendorKendari as postCekVendorKendariApi,
} from "../../helpers/backend_helper";

export const getVendorKendari = createAsyncThunk("deliver/getVendorKendari", async () => {
  try {
    const response = getVendorKendariApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailVendorKendari = createAsyncThunk("deliver/getDetailVendorKendari", async (data) => {
  try {
    const response = getVendorKendariApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const postCekVendorKendari = createAsyncThunk("deliver/postCekVendorKendari", async (vendor) => {
  try {
    const response = postCekVendorKendariApi(vendor);
    const data = await response;
    toast.success("Cek Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Cek Added Failed", { autoClose: 3000 });
    return error;
  }
});
