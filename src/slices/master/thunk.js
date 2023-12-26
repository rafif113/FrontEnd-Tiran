import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMasterAlat as getMasterAlatApi, getMasterPart as getMasterPartApi } from "../../helpers/backend_helper";

export const getMasterAlat = createAsyncThunk("master/getMasterAlat", async () => {
  try {
    const response = getMasterAlatApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getMasterPart = createAsyncThunk("master/getMasterPart", async () => {
  try {
    const response = getMasterPartApi();
    return response;
  } catch (error) {
    return error;
  }
});
