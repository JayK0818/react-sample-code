import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

interface TodoListProps {
  text: string
  id: number
  completed: boolean
}

const todoSlice = createSlice({
  initialState: [] as TodoListProps[],
  name: "todos",
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.push({
        text: action.payload,
        completed: false,
        id: state.length + 1
      })
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const target = state.find(todo => todo.id === action.payload)
      if (target) {
        target.completed = !target.completed
      }
/*       return state.map(todo => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      }) */
    },
    deleteTodo(state, action: PayloadAction<number>) {
      return state.filter(todo => todo.id !== action.payload)
    }
  },
})

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;

const getTodos = (state: RootState) => state.todos

const getTodoById = (todoList: TodoListProps[] = [], id: number) => {
  console.log("我计算了吗");
  const targetTodo = todoList.find((todo) => todo.id === id);
  return targetTodo ?? null;
};

const memorizedTodoById = createSelector(
  [(state: RootState) => state.todos],
  (todos) => {
    console.log('我重新计算了吗')
    return todos.find(todo => todo.id === 1)
  }
)

/* const memorizedTodoLength = createSelector(
  [
    (state: RootState) => state.todos.filter(todo => todo.completed),
    (state: RootState) => state.todos.filter(todo => !todo.completed)
  ],
  (completedTodoList, unCompletedTodoList) => {
    console.log('总长度计算了吗')
    return completedTodoList.length + unCompletedTodoList.length
  }
) */

const selectTodoById = (state: RootState, id: number) => {
  console.log('查找被重新计算了吗')
  return state.todos.find(todo => todo.id === id)
}

const selectTodoMemorizedById = createSelector(
  [(state: RootState, id: number) => state.todos.find(todo => todo.id === id)],
  (target) => {
    console.log('target:', target)
    return Object.assign({}, target, {
      message: 'hello'
    })
  }
)

export {
  getTodos,
  getTodoById,
  memorizedTodoById,
  selectTodoById,
  selectTodoMemorizedById,
};

export default todoSlice.reducer