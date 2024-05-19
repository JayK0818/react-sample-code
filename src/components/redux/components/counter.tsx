// import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { increment, decrement, incrementByAmount } from '@/store/counter'

/* const counterSlice = createSlice({
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
 */
const Counter = () => {
/*   store.subscribe(() => {
    console.log(store.getState())
  }) */
  const dispatch = useAppDispatch()
  const count = useAppSelector(state => state.counter)
  return (
    <div>
      <Button type={'primary'} onClick={() => dispatch(increment())}>+1</Button>
      {count}
      <Button type={'primary'} onClick={() => dispatch(incrementByAmount(4))}>+4</Button>
      <Button type={'primary'} danger onClick={() => dispatch(decrement())}>-1</Button>
    </div>
  )
}

export default Counter