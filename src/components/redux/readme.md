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

## createSlice

  lets you write reducers that use the the immer library to enable writing immutable updates using 'mutating' JS syntax. It also automatically generates action creator functions for each reducer, and generates action
  type strings internally based on your reducer's names.