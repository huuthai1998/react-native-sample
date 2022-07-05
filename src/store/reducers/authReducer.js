import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// prettier-ignore
export const signIn = createAsyncThunk(
  "LogIn",
  async (payload) => {
    try {
      const response = await axios.post("/login", {
        username: payload.username,
        password: payload.password,
      });
      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isAuth: false,
    loginErrorMessage: "",
    isLoading: false,
    walletId: "",
  },
  reducers: {
    logOut: (state) => {
      state.token = "";
      state.isAuth = false;
      console.log("Log Out!");
      state.loginErrorMessage = "";
    },
    clearLoginErrorMessage: (state) => {
      state.loginErrorMessage = "";
    },
    setWalletId: (state, { payload }) => {
      state.walletId = payload.walletId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isAuth = false;
      state.loginErrorMessage = "";
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log("Log In!");
      state.isAuth = true;
      state.token = action.payload.token;
      state.loginErrorMessage = "";
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
      state.isAuth = false;
    });
  },
});

export const { logOut, clearLoginErrorMessage, setWalletId } = authSlice.actions;

export const { reducer: authReducer } = authSlice;
