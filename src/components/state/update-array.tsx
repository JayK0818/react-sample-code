// 更新state中的数组
import React, { useState } from 'react'
import type { ChangeEvent } from 'react'
import { useImmer } from 'use-immer'

function ArtistList() {
  const [name, setName] = useState('')
  const [artists, setArtists] = useState<string[]>([])
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value)
  }
  const handleAdd = (): void => {
    setArtists([...artists, name])
    setName('')
  }
  const handleDelete = (name: string): void => {
    console.log(name)
    setArtists(artists.filter(n => n !== name))
  }
  return (
    <>
      <div>
        <h3>振奋人心的雕塑家们</h3>
        <input type="text" value={name} onChange={handleChange} />
        <button onClick={handleAdd}>click</button>
      </div>
      <ul>
        {artists.map(name => {
          return (<li key={name}>
            {name}
            <button onClick={() => { handleDelete(name) }}>Delete</button>
          </li>)
        }) }
      </ul>
    </>
  )
}

// 修改数组中的 某个元素 (使用map)
const Counter = () => {
  const [counts, setCounts] = useState([0, 0, 0])
  const handleIncrement = (idx: number): void => {
    const nextState = counts.map((count, i) => {
      if (i === idx) {
        return count + 1
      }
      return count
    })
    setCounts(nextState)
  }
  return (
    <ul>
      {counts.map((count, i) => {
        return (<li key={i }>{ count } <button onClick={() => handleIncrement(i)}>click</button></li>)
      }) }
    </ul>
  )
}

// 数组排序
const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
]
const TitleList = () => {
  const [list, setList] = useState(initialList)
  const handleReverse = (): void => {
    setList(list.slice().reverse())
  }
  return (
    <>
      <button onClick={handleReverse}>click</button>
      <ul>
        {list.map(item => {
          return (
            <li key={item.id}>{ item.title }</li>
          )
        }) }
      </ul>
    </>
  )
}

// 更新数组内部对象
const bucketList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true }
]
const BucketList = () => {
  const [list, setList] = useState(bucketList)
  const handleChanged = (id: number): void => {
    const nextList = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          seen: !item.seen
        }
      }
      return item
    })
    setList(nextList)
  }
  return (
    <>
      <h3>艺术愿望清单</h3>
      <ul>
        {
          list.map(item => {
            return (
              <li key={item.id}>
                <input type="checkbox" checked={item.seen} onChange={ () => handleChanged(item.id) } />
                <span>{ item.title }</span>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

// 使用use-immer更新数组内部对象
function AddTodo({ addTodo }: { addTodo: (v: string) => void }) {
  const [todo, setTodo] = useState('')
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim()
    setTodo(value)
  }
  const handleAddTodo = (): void => {
    if (todo) {
      addTodo(todo)
      setTodo('')
    }
  }
  return (
    <>
      <input value={todo} onChange={handleChange} />
      <button onClick={handleAddTodo}>Add Todo</button>
    </>
  )
}
interface TodoListProps {
  id: number
  text: string
  completed: boolean
}
type ToggleCheckedFunction = (id: number) => void

function List({ todoList, togoChecked, todoDelete }: { todoList: TodoListProps[], togoChecked: ToggleCheckedFunction, todoDelete: ToggleCheckedFunction }) {
  const handleToggleChecked = (id: number): void => {
    togoChecked(id)
  }
  const handleDeleteTodo = (id: number): void => {
    todoDelete(id)
  }
  return (
    <ul>
      {
        todoList.map(todo => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => { handleToggleChecked(todo.id) }}
              />
              <span>{todo.text}</span>
              <button onClick={() => { handleDeleteTodo(todo.id) }}>delete</button>
            </li>
          )
        })
      }
    </ul>
  )
}

function TodoList() {
  const [list, setList] = useImmer<TodoListProps[]>([])
  const addTodo = (todo: string): void => {
    setList(draft => {
      draft.push({
        id: list.length + 1,
        completed: false,
        text: todo
      })
    })
  }
  const handleToggleChecked = (id: number): void => {
    setList(draft => {
      const todo = draft.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    })
  }
  const handleTodoDelete = (id: number): void => {
    setList(draft => {
      const idx = draft.findIndex(todo => todo.id === id)
      if (idx !== -1) {
        draft.splice(idx, 1)
      }
    })
  }
  return (
    <>
      <AddTodo addTodo={addTodo} />
      <List todoList={list} togoChecked={handleToggleChecked} todoDelete={ handleTodoDelete } />
    </>
  )
}
const App = () => {
  return (
    <>
      <ArtistList />
      <Counter />
      <TitleList />
      <BucketList />
      <hr />
      <TodoList/>
    </>
  )
}

export default App