import { createAsyncThunk } from "@reduxjs/toolkit";

import { getVendor as getVendorApi } from "../../helpers/backend_helper";

export const getVendor = createAsyncThunk("vendor/getVendor", async () => {
  try {
    const response = getVendorApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getDetailVendor = createAsyncThunk("vendor/getDetailVendor", async (data) => {
  try {
    const response = getVendorApi(data);
    return response;
  } catch (error) {
    return error;
  }
});

// export const addPo = createAsyncThunk("vendor/addPo", async (vendor) => {
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
