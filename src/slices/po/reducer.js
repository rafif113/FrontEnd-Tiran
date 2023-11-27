import { createSlice } from "@reduxjs/toolkit";
import { addPo, getPo, getDetailPo } from "./thunk";
export const initialState = {
  po: [],
  detailPo: [],
  loading: true,
  loadingDetail: true,
  selectedPoList: [],
  error: {},
};

const PoSlice = createSlice({
  name: "PoSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingDetail: (state, action) => {
      state.loadingDetail = action.payload;
    },
    clearDetailPo: (state) => {
      state.detailPo = null;
    },
    setSelectedPoList: (state, action) => {
      state.selectedPoList = action.payload;
    },
    clearSelectedPoList: (state) => {
      state.selectedPoList = null;
    },
  },
  extraReducers: (builder) => {
    // Start po reducer
    builder.addCase(getPo.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.po = action.payload.data;
    });

    // builder.addCase(getPo.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });

    builder.addCase(getDetailPo.fulfilled, (state, action) => {
      state.detailPo = action.payload.data;
    });

    // builder.addCase(getDetailPo.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });

    builder.addCase(addPo.fulfilled, (state, action) => {
      state.po.push(action.payload);
    });

    // builder.addCase(addPo.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });
    // End po reducer
  },
});
export const { clearDetailPo, clearSelectedPoList, setLoading, setSelectedPoList, setLoadingDetail } = PoSlice.actions;

export default PoSlice.reducer;
