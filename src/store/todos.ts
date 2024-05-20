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

/* const selectCompletedTodos = (state: RootState) => {
  console.log("hello, computed todos");
  return state.todos.filter(todo => todo.completed === true)
}; */

const memorizedCompletedTodos = createSelector([
  (state: RootState) => state.todos
], (todos) => {
  console.log('我被缓存了')
  return todos.filter((todo) => todo);
});

const completedTodos = (state: RootState) => {
  console.log('我会重新计算')
  return state.todos.filter(todo => todo)
}

const getAllTodoLength = (state: RootState) => {
  console.log('重新计算length了吗')
  return state.todos.length;
};

export { memorizedCompletedTodos, getAllTodoLength, completedTodos };

export default todoSlice.reducer