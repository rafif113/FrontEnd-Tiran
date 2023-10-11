import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getComponentGroup as getComponentGroupApi,
  getMaterialType as getMaterialTypeApi,
  getCostCode as getCostCodeApi,
  addComponentGroup as addComponentGroupApi,
  addMaterialType as addMaterialTypeApi,
  addCostCode as addCostCodeApi,
} from "../../helpers/backend_helper";

export const getComponentGroup = createAsyncThunk("mol/getComponentGroup", async () => {
  try {
    const response = getComponentGroupApi();
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
});

export const getMaterialType = createAsyncThunk("mol/getMaterialType", async () => {
  try {
    const response = getMaterialTypeApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getCostCode = createAsyncThunk("mol/getCostCode", async () => {
  try {
    const response = getCostCodeApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const addComponentGroup = createAsyncThunk("mol/addComponentGroup", async (component) => {
  try {
    const response = addComponentGroupApi(component);
    const data = await response;
    toast.success("Component Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Component Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const addMaterialType = createAsyncThunk("mol/addMaterialType", async (material) => {
  try {
    const response = addMaterialTypeApi(material);
    const data = await response;
    toast.success("material Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("material Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const addCostCode = createAsyncThunk("mol/addCostCode", async (cost) => {
  try {
    const response = addCostCodeApi(cost);
    const data = await response;
    toast.success("cost Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("cost Added Failed", { autoClose: 3000 });
    return error;
  }
});
