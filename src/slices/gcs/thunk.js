import { createAsyncThunk } from "@reduxjs/toolkit";

import { postGcs as postGcsApi } from "../../helpers/backend_helper";

export const postGcs = createAsyncThunk("gcs/postGcs", async (gcs) => {
  try {
    const response = postGcsApi(gcs);
    const data = await response;
    toast.success("File Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("File Added Failed", { autoClose: 3000 });
    return error;
  }
});
