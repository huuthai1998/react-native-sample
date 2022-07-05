import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// prettier-ignore
export const signIn = createAsyncThunk(
  "user/signIn",
  async (payload, { rejectWithValue }) => {
    const response = await axios.post("/login", {
      username: payload.username,
      password: payload.password,
    });

    if (response.status < 200 || response.status >= 300) {
      console.log(response.error);
      return rejectWithValue(response.error);
    }

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
    logOut: async (state) => {
      try {
        state.token = "";
        state.isAuth = false;
      } catch (err) {
        throw err.message;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isAuth = false;
      state.isLoading = true;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log("OK!!!");
      state.isLoading = false;
      state.isAuth = true;
      state.token = action.payload.token;
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.message;
      console.log(action);
    });
  },
});

export const { logOut } = authSlice.actions;

export const { reducer: authReducer } = authSlice;
