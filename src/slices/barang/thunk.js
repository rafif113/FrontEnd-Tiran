import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getBarang as getBarangApi,
  getMasterBarang as getMasterBarangApi,
  addBarang as addBarangApi,
  getKategoriBarang as getKategoriBarangApi,
  addKategori as addKategoriApi,
  addAlatBerat as addAlatBeratApi,
  addPartNumber as addPartNumberApi,
} from "../../helpers/backend_helper";

export const getBarang = createAsyncThunk("barang/getBarang", async () => {
  try {
    const response = getBarangApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getMasterBarang = createAsyncThunk("barang/getMasterBarang", async () => {
  try {
    const response = getMasterBarangApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const addBarang = createAsyncThunk("barang/addBarang", async (barang) => {
  try {
    const response = addBarangApi(barang);
    const data = await response;
    toast.success("Barang Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Barang Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const getKategoriBarang = createAsyncThunk("barang/getKategoriBarang", async () => {
  try {
    const response = getKategoriBarangApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const addKategori = createAsyncThunk("barang/addKategori", async (kategori) => {
  try {
    const response = addKategoriApi(kategori);
    const data = await response;
    toast.success("Kategori Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Kategori Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const addPartNumber = createAsyncThunk("barang/addPartNumber", async (kategori) => {
  try {
    const response = addPartNumberApi(kategori);
    const data = await response;
    toast.success("Kategori Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Kategori Added Failed", { autoClose: 3000 });
    return error;
  }
});
export const addAlatBerat = createAsyncThunk("barang/addAlatBerat", async (kategori) => {
  try {
    const response = addAlatBeratApi(kategori);
    const data = await response;
    toast.success("Kategori Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Kategori Added Failed", { autoClose: 3000 });
    return error;
  }
});
