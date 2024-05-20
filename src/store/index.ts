import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter"
import loginSlice from './login'
import TodoReducer from './todos'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    isLogged: loginSlice.reducer,
    todos: TodoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store