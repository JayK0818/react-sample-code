import { createSlice, configureStore, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Button } from 'antd'
import { Provider, useDispatch, useSelector } from 'react-redux'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    incrementByAmount: (state, action: PayloadAction<number>) => {
      console.log('action:', action)
      return state + action.payload
    },
    incrementAsync: (state) => {
      createAsyncThunk<number>('incrementAsync', async () => {
        let value = state
        await new Promise(resolve => {
          setTimeout(() => {
          }, 2000)
        })
        return value + 1
      })
    }
  }
})
const { increment, decrement, incrementAsync, incrementByAmount } = counterSlice.actions

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<RootState>()

const Counter = () => {
  const counter = useAppSelector(state => state.counter)
  const dispatch = useAppDispatch()
  return (
    <div>
      <span>{ counter }</span>
      <Button onClick={() => dispatch(increment())}>+1</Button>
      <Button onClick={() => dispatch(decrement())}>-1</Button>
      <Button onClick={() => dispatch(incrementByAmount(3))}>+2</Button>
      <Button onClick={() => dispatch(incrementAsync())}>+1 delay 2s</Button>
    </div>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <Counter/>
    </Provider>
  )
}

export default App
