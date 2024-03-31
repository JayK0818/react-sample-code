import React, { useState, useReducer, useContext, createContext } from 'react'
import type { ChangeEvent } from 'react'

// 管理状态
function GuessNumber() {
  const [number, setNumber] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const handleNumberChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setNumber(Number(event.target.value))
  }
  const handleSubmit = async (): Promise<void> => {
    setDisabled(true)
    await new Promise(resolve => {
      window.setTimeout(resolve, 3000)
    })
    setDisabled(false)
  }
  return (
    <div>
      <p>请输入数字</p>
      <input
        type="number"
        value={number}
        onChange={handleNumberChanged}
      />
      <button disabled={disabled} onClick={handleSubmit}>提交</button>
    </div>
  )
}

// 一个计算属性
const ComputedApp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const handleChanged = (type: string, event: ChangeEvent<HTMLInputElement>): void => {
    const v = event.target.value.trim()
    switch (type) {
      case 'firstName':
        setFirstName(v)
        break
      case 'lastName':
        setLastName(v)
        break
    }
  }
  const fullName = firstName + ',' + lastName
  return (
    <>
      <div>
        <input
          name={firstName}
          onChange={(e) => { handleChanged('firstName', e) }}
        />
      </div>
      <div>
        <input
          name={lastName}
          onChange={(e) => { handleChanged('lastName', e) }}
        />
      </div>
      <div>fullName: { fullName }</div>
    </>
  )
}
// 状态提升
function Panel({ title, children, isActive, onShow }: any) {
  return (
    <div>
      <h3>{title}</h3>
      {
        isActive ? (<div>{ children }</div>): <button onClick={onShow}>显示</button>
      }
    </div>
  )
}
function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title={'关于'}
        isActive={activeIndex === 0}
        onShow={() => { setActiveIndex(0)}}
      >
        阿拉木图人口约200万，是哈萨克斯坦最大的城市。在1929年至1997年之间，它是该国首都。
      </Panel>
      <Panel
        title="词源"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        这个名字源于哈萨克语 <span lang="kk-KZ">алма</span>，是“苹果”的意思，通常被翻译成“满是苹果”。事实上，阿拉木图周围的地区被认为是苹果的祖籍，<i lang="la">Malus sieversii</i> 被认为是目前本土苹果的祖先。
      </Panel>
    </>
  )
}

// 保留和重置状态
interface ContactListProps {
  name: string
  email: string
}
const contacts: ContactListProps[] = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
]

type SelectContactFunction = (data: ContactListProps) => void

const ConcatList = ({ list, onSelect }: { list: ContactListProps[], onSelect: SelectContactFunction }) => {
  const handleSelect = (concat: ContactListProps): void => {
    onSelect(concat)
  }
  return (
    <ul>
      {list.map(concat => {
        return (
          <li key={ concat.email }>
            <button onClick={ () => {handleSelect(concat)} }>{ concat.name }</button>
          </li>
        )
      }) }
    </ul>
  )
}

const Chat = ({ contact }: { contact: ContactListProps }) => {
  const [text, setText] = useState('')
  const handleTextChanged = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value.trim())
  }
  return (
    <div>
      <textarea value={ text } onChange={handleTextChanged}></textarea>
      <button>发送给 {contact.name} { contact.email }</button>
    </div>
  )
}

const ContactApp = () => {
  const [to, setTo] = useState<ContactListProps>(contacts[0])
  const handleSelect = (contact: ContactListProps): void => {
    setTo(contact)
  }
  return (
    <>
      <ConcatList
        list={contacts}
        onSelect={handleSelect}
      />
      {/* 收件人不同, 应将其作为一个不同的组件, 使其重置状态 */}
      <Chat contact={to} key={ to.email } />
    </>
  )  
}

// 提升状态至 reducer
interface TodoListProps {
  id: number
  text: string
  completed: boolean
}
const todoReducer = (state: TodoListProps[], action: { type: string, payload: TodoListProps | number }) => {
  const { type, payload } = action
  switch (type) {
    case 'add':
      return [...state, payload as TodoListProps]
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
function AddTodo({ addTodo }: { addTodo: (text: string) => void }) {
  const [todo, setTodo] = useState('')
  const handleTodoChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setTodo(event.target.value.trim())
  }
  const handleAddTodo = (): void => {
    addTodo(todo)
    setTodo('')
  }
  return (
    <div>
      <input type="text" value={todo} onChange={handleTodoChanged} />
      <button onClick={handleAddTodo}>add todo</button>
    </div>
  )
}

function TodoList({ list, toggleTodo, deleteTodo }: {
  list: TodoListProps[],
  toggleTodo: (todo: TodoListProps) => void,
  deleteTodo: (todoId: number) => void
}) {
  const handleToggleTodo = (todo: TodoListProps): void => {
    toggleTodo(todo)
  }
  const handleDeleteTodo = (todoId: number): void => {
    deleteTodo(todoId)
  }
  return (
    <ul>
      {
        list.map(todo => {
          return (
            <li key={ todo.id }>
              <input type="checkbox" checked={todo.completed} onChange={ () => {handleToggleTodo(todo)} } />
              <span>{todo.text}</span>
              <button onClick={() => {handleDeleteTodo(todo.id)}}>删除</button>
            </li>
          )
        })
      }
    </ul>
  )
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const handleAddTodo = (text: string): void => {
    dispatch({
      type: 'add',
      payload: {
        id: todos.length + 1,
        text,
        completed: false
      }
    })
  }
  const handleToggleTodo = (todo: TodoListProps): void => {
    dispatch({
      type: 'toggle',
      payload: todo.id
    })
  }
  const handleDeleteTodo = (todoId: number): void => {
    dispatch({
      type: 'delete',
      payload: todoId
    })
  }
  return (
    <div>
      <AddTodo addTodo={handleAddTodo} />
      <TodoList list={todos} toggleTodo={handleToggleTodo} deleteTodo={ handleDeleteTodo } />
    </div>
  )
}

// 使用  context
const ChildCounter = () => {
  const counter = useContext(CounterContext)
  return (
    <div>我是子组件: { counter }</div>
  )
}

const CounterContext = createContext(0)
// 使用consumer
const ConsumerCounter = () => {
  return (
    <CounterContext.Consumer>
      {counter => (<div>我是consumer 子组件: { counter }</div>) }
    </CounterContext.Consumer>
  )
}

const ContextApp = ({ children }: any) => {
  const [counter, setCounter] = useState(0)
  return (
    <CounterContext.Provider value={counter}>
      { children }
      <button onClick={() => {
        setCounter(counter + 1)
      }}>click {counter} times</button>
      <ChildCounter />
      <ConsumerCounter/>
    </CounterContext.Provider>
  )
}

const App = () => {
  return (
    <>
      <GuessNumber />
      <ComputedApp />
      <Accordion />
      <ContactApp />
      <TodoApp />
      <ContextApp/>
    </>
  )
}

export default App