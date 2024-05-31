import { createSlice, configureStore, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'

const initialState = [
  {
    id: 1,
    text: 'Learn Redux',
    completed: false
  },
  {
    id: 2,
    text: 'Learn React',
    completed: true
  }
]
const todoAdapter = createEntityAdapter()
// console.log(todoAdapter.getInitialState())
/**
 * {
 *  entities: {},
 *  ids: []
 * }
*/
// console.log(todoAdapter.getInitialState(initialState))
/**
 * {
*   0:  { id: 1, text: 'Learn Redux', completed: false}
    1:  { id: 2, text: 'Learn React', completed: true },
    entities: {},
    ids: []
 * }
 * 
*/
console.log(todoAdapter)

const todoSlice = createSlice({
  name: 'todos',
  initialState: todoAdapter.getInitialState({}, initialState),
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      console.log('state:', state)
      // todoAdapter.addOne(state)
    }
  } 
})
const { addTodo } = todoSlice.actions

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer
  }
})
type RootState = ReturnType<typeof store.getState>

const { selectAll } = todoAdapter.getSelectors(state => (state as RootState).todos)


const TodoApp = () => {
  const dispatch = useDispatch()
  const todos = useSelector(selectAll)
  console.log('todos:', todos)
  useEffect(() => {
    dispatch(addTodo('123'))
  })
  return null
}

const App = () => {
  return (
    <Provider store={store}>
      <TodoApp/>
    </Provider>
  )
}

export default App