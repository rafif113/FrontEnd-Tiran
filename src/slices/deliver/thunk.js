import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getVendorKendari as getVendorKendariApi,
  postCekVendorKendari as postCekVendorKendariApi,
  getVendorSite as getVendorSiteApi,
  postDeliveVendorSite as postDeliveVendorSiteApi,
  postCekVendorSite as postCekVendorSiteApi,
  postDeliveVendorParsial as postDeliveVendorParsialApi,
  getPartSpb as getPartSpbApi,
  getListSpb as getListSpbApi,
  postSpb as postSpbApi,
  postSpbSite as postSpbSiteApi,
  getListGrPo as getListGrPoApi,
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

export const postDeliveVendorParsial = createAsyncThunk("deliver/postDeliveVendorParsial", async (vendor) => {
  try {
    const response = postDeliveVendorParsialApi(vendor);
    const data = await response;
    toast.success("Cek Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Cek Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const getListSpb = createAsyncThunk("deliver/getListSpb", async () => {
  try {
    const response = getListSpbApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getPartSpb = createAsyncThunk("deliver/getPartSpb", async () => {
  try {
    const response = getPartSpbApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailSpb = createAsyncThunk("deliver/getDetailSpb", async (spb) => {
  try {
    const response = getListSpbApi(spb);
    return response;
  } catch (error) {
    return error;
  }
});

export const postSpb = createAsyncThunk("deliver/postSpb", async (spb) => {
  try {
    const response = postSpbApi(spb);
    const data = await response;
    toast.success("Cek Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Cek Added Failed", { autoClose: 3000 });
    return error;
  }
});
export const postSpbSite = createAsyncThunk("deliver/postSpbSite", async (spb) => {
  try {
    const response = postSpbSiteApi(spb);
    const data = await response;
    toast.success("Cek Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Cek Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const getListGrPo = createAsyncThunk("deliver/getListGrPo", async () => {
  try {
    const response = getListGrPoApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailGrPo = createAsyncThunk("deliver/getDetailGrPo", async (data) => {
  try {
    const response = getListGrPoApi(data);
    return response;
  } catch (error) {
    return error;
  }
});
