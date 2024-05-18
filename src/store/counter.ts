import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const counterReducer = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    incrementByAmount: (state, action: PayloadAction<number>) => {
      return state += action.payload
    },
  },
});

const { increment, decrement, incrementByAmount } = counterReducer.actions

export default counterReducer.reducer

export {
  increment,
  decrement,
  incrementByAmount
}