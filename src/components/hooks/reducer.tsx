// useReducer, 对于拥有许多状态更新逻辑的组件来说, 过于分散的事件处理程序可能会令人不知所措。
import React, { useReducer, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useImmer, useImmerReducer } from 'use-immer'

interface TodoListProps {
  id: number
  text: string
  completed: boolean
}

interface TodoActionProps<T = any> {
  type: string
  payload: T
}

let nextId = 0

/* const handleAddTodo = (text: string): void => {
  dispatch({
    type: 'added',
    id: nextId++,
    text
  })
}

const handleToggleTodo = (todoId: number): void => {
  dispatch({
    type: 'toggle',
    todoId
  })
}

const handleDeleteTodo = (todoId: number): void => {
  dispatch({
    type: 'delete',
    todoId
  })
} */

/*
为什么叫reducer
*/
let initialState: any[] = []
const actions = [
  { type: 'added', payload: 'hello world' },
  { type: 'added', payload: '你好世界'} 
]

const todoReducer = (state: TodoListProps[] = [], action: TodoActionProps): TodoListProps[] => {
  const { type, payload } = action
  switch (type) {
    case 'added':
      return [
        ...state,
        {
          text: payload,
          id: nextId++,
          completed: false
        }
      ]
    case 'toggle':
      return state.map(todo => {
        if (todo.id === payload) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo
      })
    case 'delete':
      return state.filter(todo => todo.id !== payload)
    default:
      return state
  }
}
// useImmerReducer
const todoImmerReducer = (draft: TodoListProps[] = [], action: TodoActionProps) => {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: nextId++,
        text: action.payload,
        completed: false
      })
    }
      break
    case 'toggle': {
      const target = draft.find((todo: any) => todo.id === action.payload)
      if (target) {
        target.completed = !target.completed
      }
    }
      break
  }
}
console.log(actions.reduce(todoReducer, initialState))

function TodoInput({ addTodo }: { addTodo: (text: string) => void } ) {
  const [text, setText] = useState('')
  const handleTextChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value.trim())
  }
  const haneleAddTodo = (): void => {
    addTodo(text)
    setText('')
  }
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleTextChanged}
      />
      <button onClick={haneleAddTodo}>Add Todo</button>
    </div>
  )
}

function TodoList({ list, toggleTodo }: { list: TodoListProps[], toggleTodo: any }) {
  return (
    <ul>
      {
        list.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={ () => toggleTodo(todo.id) }
            />
            {todo.text}
          </li>
        ))
      }
    </ul>
  )
}

/**
 * @description 使用useState实现 useReducer Hook
 * */ 
const useMyReducer = (reducer: any, initialState?: any) => {
  const [state, setState] = useState(initialState)
  const dispatch = (action: TodoActionProps): void => {
    const nextState = reducer(state, action)
    setState(nextState)
  }
  return [
    state,
    dispatch
  ]
}

const TodoApp = () => {
  // const [todos, dispatch] = useReducer(todoReducer, [])
  // const [todos, dispatch] = useImmerReducer(todoImmerReducer, [])
  const [todos, dispatch] = useMyReducer(todoReducer, [])
  const handleAddTodo = (text: string): void => {
    if (!text) return
    dispatch({
      type: 'added',
      payload: text
    })
  }
  const handleToggleTodo = (todoId: number): void  => {
    dispatch({
      type: 'toggle',
      payload: todoId
    })
  }
  return (
    <>
      <TodoInput addTodo={handleAddTodo} />
      <TodoList
        toggleTodo={handleToggleTodo}
        list={todos}
      />
    </>
  )
}

export default TodoApp