import { createAsyncThunk } from "@reduxjs/toolkit";

import { getKttPo as getKttPoApi, postKttApprove as postKttApproveApi } from "../../helpers/backend_helper";

export const getKttPo = createAsyncThunk("ktt/getKttPo", async () => {
  try {
    const response = getKttPoApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailKttPo = createAsyncThunk("ktt/getDetailKttPo", async (data) => {
  try {
    const response = getKttPoApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const postKttApprove = createAsyncThunk("ktt/postKttApprove", async (approve) => {
  try {
    const response = postKttApproveApi(approve);
    const data = await response;
    toast.success("Ktt Approved", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Ktt Approved Failed", { autoClose: 3000 });
    return error;
  }
});
