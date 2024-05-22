# Redux

## Install

```js
cnpm install redux --save
cnpm install @reduxjs/toolkit --save
cnpm install react-redux --save

```
  The whole global state of your app is stored in an object tree inside a single store. The only way to change
  the state tree is to create an action.

```ts
// 基本使用
import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
})

const { increment, decrement } = counterSlice.actions

const store = configureStore({
  reducer: counterSlice.reducer
})

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(increment())
store.dispatch(decrement())
```

## configureStore

    sets up a well-configured Redux store with a single function call, including combing reducers, andding 
    the thunk middleware.

```ts
// store相关的 type
export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch // innered type

// It's better to create typed versions of the useDispatch and useSelector hooks for usage in your application
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<RootState>()
```
## createSlice

  lets you write reducers that use the the immer library to enable writing immutable updates using 'mutating' JS syntax. It also automatically generates action creator functions for each reducer, and generates action
  type strings internally based on your reducer's names.

  Each slice file should define a type for its initial state value, so that **createSlice** can correctly infer the type of **state** in each case reducer
  (每个字段的初始值需要定义一个类型, 这样 createSlice 可以正确的推断出 state的 每个类型)

  All generated actions should be defined using the **PayloadAction<T>** type. which takes the type of the
  **action.payload** field as its generic argument.

```ts
import type { PayloadAction } from '@redux/toolkit'
import { createSlice } from '@redux/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    incrementByAmount: (state, action: PayloadAction<number>) => {
      return state + action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

## Reselect

  A library for creating memoized 'selector' functions. Commonly used with Redux, but usable with any plain JS
  immutable data as well.

  Reselect exports a **createSelector** API, which generates memorized selector functions. **createSelector** accepts
  one or more **input selectors**, which extract values from arguments and a **result function** function that receives the extracted values and should return a derived value.
```ts
const memoizedSelectCompletedTodos = createSelector(
  [(state: RootState, a: number, b: number, c: number) => state.todos],
  todos => {
    console.log('memoized selector ran')
    return todos.filter(todo => todo.completed === true)
  }
)

import { useSelector } from 'react-redux'
const App = () => {
  const findTodo = useSelector(state => memoizedSelectCompletedTodos(state, 1, 2, 3))
  return (
    <div>{}</div>
  )
}

// usage
const outputSelector = createSelector(
  [inputSelector1, inputSelector2, inputSelector3], // synonymous with `dependencies`.
  resultFunc // Result function
)
```