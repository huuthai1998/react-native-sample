import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// prettier-ignore
export const signIn = createAsyncThunk(
  "LogIn",
  async (payload) => {
    const response = await axios.post("/login", {
      username: payload.username,
      password: payload.password,
    });
    return response.data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    counter: 0,
    token: {},
    isAuth: false,
    isLoading: false,
    walletId: "",
  },
  reducers: {
    logOut: (state) => {
      state.token = "";
      state.isAuth = false;
      console.log("Log Out!");
    },
    setWalletId: (state, { payload }) => {
      state.walletId = payload.walletId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isAuth = false;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log("Log In!");
      state.isAuth = true;
      state.token = action.payload.token;
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.errorMessage = action;
      state.isAuth = false;
    });
  },
});

export const { logOut, setWalletId } = authSlice.actions;

export const { reducer: authReducer } = authSlice;
