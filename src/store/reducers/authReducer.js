import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    counter: 0,
    token: {},
  },
  reducers: {
    signIn: async (state, { payload }) => {
      try {
        const { data } = await axios.post("/login", {
          username: payload.username,
          password: payload.password,
        });
        console.log(data);
        state.token = payload.token;
      } catch (err) {
        throw (err.message);
      }
    },
  },
});

export const { signIn } = authSlice.actions;

export const { reducer: authReducer } = authSlice;
