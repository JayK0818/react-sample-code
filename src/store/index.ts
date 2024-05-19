import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter"
import loginSlice from './login'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    isLogged: loginSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store