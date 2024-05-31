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

  **createSlice** uses a library called **Immer**
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

// 提取数据
// If we do change our state structure again, we only need to update the code in the slice file.
const selectCount = state => state.counter

export default counterSlice.reducer
```
  An **Action** is a plain JavaScript object that has a **type** field. We usually write that type string like
  **domain/eventName**. An action object can have other fields with additional information about what happend.


  A **reducer** is a function that receives the current **state** and an **action** object.
  **(state, action) => newState**
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

  In order to update values immutably, your code must make copies of existing objects/arrays, and then modify the copies.

```js
const obj = {
  a: {
    c: 3
  },
  b: 2
}

const obj2 = {
  ...obj,
  a: {
    ...obj.a,
    c: 42
  }
}
```

## createAsyncThunk

```ts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})
```
  createAsyncThunk accepts two arguments:
1. A string that will be used as the prefix for the generated action types
2. A 'payload creator' callback function that should return a **Promise** containint some data, or a rejected
**Promise** with an error

### Thunk arguments

  You can only pass in one argument, and whatever we pass in becomes the first argument of the payload creation callback. 第二个参数 是一个对象 包含一些有用的函数

```tsx
const incrementAsync = createThunkAsync('incrementAsync', async (n: number, { dispatch, getState }) => {
  console.log('n:', n) // 打印10
  console.log(getState()) // getState() 返回的是整个store的数据
  await new Promise(resolve => setTimeout(resolve, 2000))
  return 1
})

const Counter = () => {
  const dispatch = useDispatch()
  return (
    <Button
      onClick={{} => dispatch(incrementAsync(10))}
    >click</Button>
  )
}
```

  The **builder** object in **extraReducers** provides methods that let us define additional case reducers
  that will run in response to actions defined outside of the slice:

```js
builder.addCase(actionCreator, reducer)
```

一个异步计数器的例子

```js
const incrementAsync = createAsyncThunk('incrementAsync', async () => {
  console.log('开始执行')
  await new Promise(resolve => {
    window.setTimeout(resolve, 2 * 1000)
  })
  console.log('执行结束')
  return 10
})

const counterSlice = createSlice({
  name: 'counter',
  extraReducers: builder => {
    builder
      .addCase(incrementAsync.pending, (state, action) => {
        console.log('pending', state, action)
        return state // 一定要return, 否则 不会执行后面的 addCase
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        console.log('fulfilled:', state, action)
        return state + action.payload
        // 可以直接返回一个新的值 代替state, 或者在原始state值上进行操作
      })
  }
})

const Counter = () => {
  const dispatch = useDispatch()
  const handleClick = async () => {
    const data = await dispatch(incrementAsync()).unwrap()
    /**
     * Redux Toolkit adds a .unwrap() function to the returned **Promise**, which will return a new
     * Promise that either has the actual action.payload value from a fulfilled action, or throws an
     * error if it's the rejected action.
    */
  }
  return (
    <Button onClick={handleClick}></Button>
  )
}
```
## Nomalized State Structure

  Redux Toolkit's **createEntityAdapter** API provvides a standardized way to store your data in a slice by taking
  a collection of items and putting them into the shape of { ids: [], entities: {} }
```js
{
  users: {
    ids: ["user1", "user2", "user3"],
    entities: {
      "user1": {id: "user1", firstName, lastName},
      "user2": {id: "user2", firstName, lastName},
      "user3": {id: "user3", firstName, lastName},
    }
  }
}
```
  It returns an object that contains a set of generated reducer functions for adding, updating, and removing
  items from an entity state object.