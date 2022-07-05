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
  },
  reducers: {
    logOut: (state) => {
      state.token = "";
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isAuth = false;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log("Log In successfull!!");
      state.isAuth = true;
      state.token = action.payload.token;
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.errorMessage = action;
      state.isAuth = false;
    });
  },
});

export const { logOut } = authSlice.actions;

export const { reducer: authReducer } = authSlice;
