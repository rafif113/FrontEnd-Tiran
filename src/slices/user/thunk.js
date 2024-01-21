import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getUser as getUserApi,
  getRole as getRoleApi,
  postRegister as postRegisterApi,
  postUserRole as postUserRoleApi,
  postRole as postRoleApi,
} from "../../helpers/backend_helper";

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = getUserApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getUserDetail = createAsyncThunk("user/getUserDetail", async (data) => {
  try {
    const response = getUserApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const getRole = createAsyncThunk("user/getRole", async () => {
  try {
    const response = getRoleApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const postRegister = createAsyncThunk("user/postRegister", async (pr) => {
  try {
    const response = postRegisterApi(pr);
    const data = await response;
    toast.success("PR Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("PR Added Failed", { autoClose: 3000 });
    return error;
  }
});
export const postUserRole = createAsyncThunk("user/postUserRole", async (pr) => {
  try {
    const response = postUserRoleApi(pr);
    const data = await response;
    toast.success("PR Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("PR Added Failed", { autoClose: 3000 });
    return error;
  }
});
export const postRole = createAsyncThunk("user/postRole", async (pr) => {
  try {
    const response = postRoleApi(pr);
    const data = await response;
    toast.success("PR Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("PR Added Failed", { autoClose: 3000 });
    return error;
  }
});
