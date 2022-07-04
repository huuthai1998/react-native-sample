import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    counter: 0,
    user: {},
  },
  reducers: {
    signIn: async () => {
      const { data } = await axios.post("/login", {
        username: "test2",
        password: "any",
      });
      console.log(data);
    },
    reset: (state) => {
      state.counter = 0;
    },
    increaseByAmount: (state, { payload }) => {
      state.counter += parseInt(payload.amount, 10);
    },
    decreaseByAmount: (state, { payload }) => {
      state.counter -= parseInt(payload.amount, 10);
    },
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
  },
});

export const {
  reset,
  increment,
  decrement,
  increaseByAmount,
  decreaseByAmount,
  signIn,
} = authSlice.actions;

export const { reducer: authReducer } = authSlice;
