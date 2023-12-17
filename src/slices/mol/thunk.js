import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addMol as addMolApi,
  getMol as getMolApi,
  getComponentGroup as getComponentGroupApi,
  getMaterialType as getMaterialTypeApi,
  getCostCode as getCostCodeApi,
  addComponentGroup as addComponentGroupApi,
  addMaterialType as addMaterialTypeApi,
  addCostCode as addCostCodeApi,
  getPengeluaran as getPengeluaranApi,
  addPengeluaran as addPengeluaranApi,
  addMolFuelTire as addMolFuelTireApi,
} from "../../helpers/backend_helper";

export const getMol = createAsyncThunk("mol/getMol", async () => {
  try {
    const response = getMolApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailMol = createAsyncThunk("mol/getDetailMol", async (data) => {
  try {
    const response = getMolApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const getComponentGroup = createAsyncThunk("mol/getComponentGroup", async () => {
  try {
    const response = getComponentGroupApi();
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

export const addMol = createAsyncThunk("mol/addMol", async (mol) => {
  try {
    const response = addMolApi(mol);
    const data = await response;
    toast.success("mol Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("mol Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const addPengeluaran = createAsyncThunk("mol/addPengeluaran", async (pengeluaran) => {
  try {
    const response = addPengeluaranApi(pengeluaran);
    const data = await response;
    toast.success("Pengeluaran Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Pengeluaran Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const getPengeluaran = createAsyncThunk("mol/getPengeluaran", async () => {
  console.log(1);
  try {
    const response = getPengeluaranApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailPengeluaran = createAsyncThunk("mol/getDetailPengeluaran", async (data) => {
  try {
    const response = getPengeluaranApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const addMolFuelTire = createAsyncThunk("mol/addMolFuelTire", async (fueltire) => {
  try {
    const response = addMolFuelTireApi(fueltire);
    const data = await response;
    toast.success("Component Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Component Added Failed", { autoClose: 3000 });
    return error;
  }
});
