import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Button } from 'antd'
import { useSelector, Provider } from 'react-redux'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
})

const store = configureStore({
  reducer: counterSlice.reducer
})

const { decrement, increment } = counterSlice.actions

const Counter = () => {
  store.subscribe(() => {
    console.log(store.getState())
  })
  return (
    <div>
      <Button onClick={() => store.dispatch(increment())}>+1</Button>
      <Button onClick={() => store.dispatch(decrement())}>-1</Button>
    </div>
  )
}

export default Counter