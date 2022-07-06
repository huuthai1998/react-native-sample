import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    selectedToken: { name: "", id: "", symbol: "", description: "" },
  },
  reducers: {
    setSelectedToken: (state, { payload }) => {
      state.selectedToken = payload.selectedToken;
    },
  },
});

export const { setSelectedToken } = tokenSlice.actions;

export const { reducer: tokenReducer } = tokenSlice;
