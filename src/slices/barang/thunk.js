import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import { getBarang as getBarangApi } from "../../helpers/backend_helper";

export const getBarang = createAsyncThunk("barang/getBarang", async () => {
  try {
    const response = getBarangApi();
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
});
