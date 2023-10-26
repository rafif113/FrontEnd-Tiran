import { createAsyncThunk } from "@reduxjs/toolkit";

import { addPenawaran as addPenawaranApi, getPenawaran as getPenawaranApi } from "../../helpers/backend_helper";

export const addPenawaran = createAsyncThunk("penawaran/addPenawaran", async (penawaran) => {
  try {
    const response = addPenawaranApi(penawaran);
    const data = await response;
    toast.success("penawaran Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("penawaran Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const getPenawaran = createAsyncThunk("penawaran/getPenawaran", async () => {
  try {
    const response = getPenawaranApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailPenawaran = createAsyncThunk("penawaran/getDetailPenawaran", async (data) => {
  try {
    const response = getPenawaranApi(data);
    return response;
  } catch (error) {
    return error;
  }
});
