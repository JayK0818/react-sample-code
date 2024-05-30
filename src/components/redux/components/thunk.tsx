import { createSlice, configureStore, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Button } from 'antd'
import { Provider, useDispatch, useSelector } from 'react-redux'

const incrementAsync = createAsyncThunk('incrementAsync', async () => {
  console.log('开始执行')
  await new Promise(resolve => {
    window.setTimeout(resolve, 2 * 1000)
  })
  console.log('执行结束')
  return 10
})

const _increment = () => {
  return {
    type: 'counter/increment'
  }
}

// 接受参数
const incrementAsyncByAmount = createAsyncThunk('incrementAsyncByAmount', async (step: number, {
  dispatch,
  getState
}) => {
  console.log('执行了吗', 'step:', step)
  console.log(dispatch, getState())
  dispatch(_increment())
  await new Promise(resolve => {
    window.setTimeout(resolve, 2 * 1000)
  })
  console.log('执行结束')
  return step
})

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    incrementByAmount: (state, action: PayloadAction<number>) => {
      console.log('action:', action)
      return state + action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(incrementAsync.pending, (state, action) => {
        console.log('pending', state, action)
        return state
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        console.log('fulfilled:', state, action)
        return state + action.payload
      })
    builder.addCase(incrementAsyncByAmount.fulfilled, (state, action) => {
      console.log('异步按步新增', state, action)
      return state + action.payload
    })
  }
})
const { increment, decrement, incrementByAmount } = counterSlice.actions

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
  const handleIncrementAsync = async () => {
    console.log('点击了')
    const data = await dispatch(incrementAsyncByAmount(7)).unwrap()
    console.log('执行结束', data)
  }
  return (
    <div>
      <span>{ counter }</span>
      <Button onClick={() => dispatch(increment())}>+1</Button>
      <Button onClick={() => dispatch(decrement())}>-1</Button>
      <Button onClick={() => dispatch(incrementByAmount(3))}>+3</Button>
      <Button onClick={() => dispatch(incrementAsync())}>+1 delay 2s</Button>
      <Button onClick={handleIncrementAsync} type={'primary'}>+7 delay 2s</Button>
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
