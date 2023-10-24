import { createAsyncThunk } from "@reduxjs/toolkit";

import { addPenawaran as addPenawaranApi } from "../../helpers/backend_helper";

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
