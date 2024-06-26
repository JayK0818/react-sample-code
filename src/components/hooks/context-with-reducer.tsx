import { useReducer, useContext, createContext, useState, ChangeEvent } from 'react'
import { Input, Button, Checkbox, message } from 'antd'

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
]

function taskReducers(state: any[]= [], action: { type: string, payload: any }): typeof initialTasks {
  console.log('action', action)
  switch (action.type) {
    case 'add':
      return [...state, {
        id: state.length ,
        text: action.payload,
        done: false
      }]
    case 'delete':
      return state.filter(item => item.id !== action.payload)
    case 'toggle':
      return state.map(task => {
        if (task.id === action.payload) {
          return {
            ...task,
            done: !task.done
          }
        }
        return task
      })
      default:
      return state
  }
}

/* const TaskContext = createContext<any[]>([])
const TaskDispatchContext = createContext<any>(null)

const AddTask = () => {
  const [task, setTask] = useState('')
  const dispatch = useContext(TaskDispatchContext)
  const handleTaskChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value.trim())
  }
  return (
    <div>
      <input value={task} onChange={ handleTaskChanged } />
      <button onClick={() => dispatch({ type: 'add', payload: task })}>确定</button>
    </div>
  )
} */

/* const TaskList = () => {
  const taskList = useContext(TaskContext)
  const dispatch = useContext(TaskDispatchContext)
  return (
    <ul>
      {
        taskList.length > 0 && (
          taskList.map(task => {
            return (
              <li key={task.id}>
                <input type='checkbox' checked={task.done} onChange={ () => dispatch({ type: 'toggle', payload: task.id }) } />
                <span>{ task.text }</span>
              </li>
            )
          })
        )
      }
    </ul>
  )
} */

// 使用 useReducer和 contextAPI
/* const TaskApp = () => {
  const [tasks, dispatch] = useReducer(taskReducers, initialTasks)
  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        <AddTask />
        <TaskList/>
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  )
}
 */

// 以下方式 不会 tasks列表不会更新数据
/* const AddTask = () => {
  const [task, setTask] = useState('')
  const [tasks, dispatch] = useReducer(taskReducers, initialTasks)
  const handleTaskChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value.trim())
  }
  const handleAddTask = (): void => {
    dispatch({
      type: 'add',
      payload: task
    })
    setTask('')
    console.log('task:', tasks)
  }
  return (
    <div>
      <input value={task} onChange={handleTaskChanged} />
      <button onClick={handleAddTask}>新增</button>
    </div>
  )
}

const TaskApp = () => {
  const [state, dispatch] = useReducer(taskReducers, initialTasks)
  return (
    <div>
      <AddTask />
      <ul>
        {
          state.length > 0 && state.map(task => (
            <li key={task.id}>
              <span>{ task.done ? 'done' : 'wait' }</span>
              <span style={{paddingLeft: 10}}>{ task.text }</span>
            </li>
          ))
        }
      </ul>
      <div>{ state.length } todos</div>
    </div>
  )
} */

// 使用自定义hook 以下代码无法自动更新 tasks
const useTaskHook = () => {
  const [tasks, dispatch] = useReducer(taskReducers, initialTasks)
  return {
    tasks,
    dispatch
  }
}

const AddTask = () => {
  const { dispatch, tasks } = useTaskHook()
  const [task, setTask] = useState('')
  const handleTaskChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event?.target.value.trim())
  }
  const handleAddTask = (): void => {
    if (!task) {
      message.warning('任务不得为空')
      return
    }
    dispatch({
      type: 'add',
      payload: task
    })
    setTask('')
    console.log('tasks-list:', tasks)
  }
  return (
    <div style={{width: 500, display: 'flex', padding: '10px 0'}}>
      <Input value={task} onChange={handleTaskChanged} />
      <Button
        type='primary'
        onClick={handleAddTask}
      >确定</Button>
    </div>
  )
}

const TaskList = () => {
  const { tasks } = useTaskHook()
  console.log('tasks-list:', tasks)
  return (
    <ul>
      {
        tasks.map(task => (
          <li key={task.id}>
            <Checkbox checked={task.done} />
            <span>{ task.text }</span>
          </li>
        ))
      }
    </ul>
  )
}

const TaskApp = () => {
  return (
    <>
      <AddTask />
      <TaskList/>
    </>
  )
}

export default TaskApp