import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getReportUnit as getReportUnitApi,
  getReportBarangIn as getReportBarangInApi,
  getReportBarangOut as getReportBarangOutApi,
} from "../../helpers/backend_helper";

export const getReportUnit = createAsyncThunk("report/getReportUnit", async () => {
  try {
    const response = getReportUnitApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getReportBarangIn = createAsyncThunk("report/getReportBarangIn", async () => {
  try {
    const response = getReportBarangInApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getReportBarangOut = createAsyncThunk("report/getReportBarangOut", async () => {
  try {
    const response = getReportBarangOutApi();
    return response;
  } catch (error) {
    return error;
  }
});
