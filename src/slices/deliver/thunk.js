import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getVendorKendari as getVendorKendariApi,
  postCekVendorKendari as postCekVendorKendariApi,
  getVendorSite as getVendorSiteApi,
  postDeliveVendorSite as postDeliveVendorSiteApi,
  postCekVendorSite as postCekVendorSiteApi,
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

export const getVendorSite = createAsyncThunk("deliver/getVendorSite", async () => {
  try {
    const response = getVendorSiteApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailVendorSite = createAsyncThunk("deliver/getDetailVendorSite", async (data) => {
  try {
    const response = getVendorSiteApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const postDeliveVendorSite = createAsyncThunk("deliver/postDeliveVendorSite", async (vendor) => {
  try {
    const response = postDeliveVendorSiteApi(vendor);
    const data = await response;
    toast.success("Cek Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Cek Added Failed", { autoClose: 3000 });
    return error;
  }
});
export const postCekVendorSite = createAsyncThunk("deliver/postCekVendorSite", async (vendor) => {
  try {
    const response = postCekVendorSiteApi(vendor);
    const data = await response;
    toast.success("Cek Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Cek Added Failed", { autoClose: 3000 });
    return error;
  }
});
