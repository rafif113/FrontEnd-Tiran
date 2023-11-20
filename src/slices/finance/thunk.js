import { createAsyncThunk } from "@reduxjs/toolkit";

import { getFinancePo as getFinancePoApi, getFinanceTongkang as getFinanceTongkangApi } from "../../helpers/backend_helper";

export const getFinancePo = createAsyncThunk("finance/getFinancePo", async () => {
  try {
    const response = getFinancePoApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailFinancePo = createAsyncThunk("finance/getDetailFinancePo", async (data) => {
  try {
    const response = getFinancePoApi(data);
    console.log(response);

    return response;
  } catch (error) {
    return error;
  }
});

export const getFinanceTongkang = createAsyncThunk("finance/getFinanceTongkang", async () => {
  try {
    const response = getFinanceTongkangApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailFinanceTongkang = createAsyncThunk("finance/getDetailFinanceTongkang", async (data) => {
  try {
    const response = getFinanceTongkangApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

// export const addPo = createAsyncThunk("po/addPo", async (po) => {
//   try {
//     const response = addPoApi(po);
//     const data = await response;
//     toast.success("po Added Successfully", { autoClose: 3000 });
//     return data;
//   } catch (error) {
//     toast.error("po Added Failed", { autoClose: 3000 });
//     return error;
//   }
// });
