import React, { useState, ChangeEvent } from 'react'
import { Input, Button, message, Empty, Checkbox } from 'antd'
import { addTodo, deleteTodo, toggleTodo, memorizedCompletedTodos, getAllTodoLength, completedTodos } from '@/store/todos'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const AddTodo = () => {
  const dispatch = useAppDispatch()
  const [todo, setTodo] = useState('')
  const handleTodoChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setTodo(event.target.value)
  }
  const memorizedTodos = useAppSelector(memorizedCompletedTodos)
  const todos = useAppSelector(completedTodos)
  const todoLength = useAppSelector(getAllTodoLength)
  const handleAddTodo = (): void => {
    if (!todo) {
      message.warning('请输入代办事项')
      return
    }
    dispatch(addTodo(todo))
    setTodo('')
  }
  return (
    <>
      <div style={{ padding: 10, display: 'flex' }}>
        <Input value={todo} onChange={ handleTodoChanged } />
        <Button onClick={handleAddTodo}>确定</Button>
      </div>
      {JSON.stringify(memorizedTodos)} --- {JSON.stringify(todos)}
    </>
  )
}

const TodoList = () => {
  // const todoList = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()
  const todoList = useAppSelector(memorizedCompletedTodos)
  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id))
  }
  return (
    <>
      {todoList.length > 0 ? (
        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
          {
            todoList.map(todo => (<li key={todo.id}>
              <Checkbox checked={todo.completed} onClick={ () => handleToggle(todo.id)} />
              <span>{ todo.text }</span>
            </li>))
          }
        </ul>
      ) : <Empty/>}
    </>
  )
}

const TodoApp = () => {
  return (
    <div style={{ width: 560, margin: '0 auto' }}>
      <AddTodo />
      <TodoList/>
    </div>
  )
}

export default TodoApp