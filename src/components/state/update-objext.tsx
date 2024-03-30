// 更新对象
import React, { useState } from 'react'
import type { ChangeEvent } from 'react'
import { useImmer, useImmerReducer } from 'use-immer'
import type { Draft } from 'immer'

const style: React.CSSProperties = {
  width: 300,
  height: 300,
  position: 'relative',
  border: '1px solid #d9d9d9'
}
const dot_style: React.CSSProperties = {
  width: 10,
  height: 10,
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: 'red',
  zIndex: 10
}

function MovingDot() {
  const [position, setPosition] = useState({
    left: 0,
    top: 0
  })
  const handleMouseMove = (event: React.MouseEvent): void => {
    const x = event.clientX
    const y = event.clientY
    const { top, left } = (event.target as HTMLElement).getBoundingClientRect()
    setPosition({
      left: x - left,
      top: y - top
    })
    console.log(position)
  }
  return (
    <div style={style} onMouseMove={handleMouseMove}>
      <div style={{...dot_style, ...position}}></div>
    </div>
  )
}

// 修改对象某个属性
function Counter() {
  const [counter, setCounter] = useState({ value: 0 })
  const handleClick = () => {
    counter.value += 1
  }
  return (
    <button onClick={handleClick}>click me { counter.value } times</button>
  )
}

// 使用展开语法复制对象
function Form() {
  const [person, setPerson] = useState({
    firstName: '',
    lastName: ''
  })
  const handleUpdateFirstName = (e: ChangeEvent<HTMLInputElement>): void => {
    setPerson({
      ...person,
      firstName: e.target.value.trim()
    })
  }
  const handleUpdateLastName = (e: ChangeEvent<HTMLInputElement>): void => {
    setPerson({
      ...person,
      lastName: e.target.value.trim()
    })
  }
  return (
    <form>
      <label>
        <input
          type="text"
          value={person.firstName}
          onChange={handleUpdateFirstName}
        />
      </label>
      <label>
        <input
          type="text"
          value={person.lastName}
          onChange={handleUpdateLastName}
        />
      </label>
      <div>{person.firstName}, { person.lastName }</div>
    </form>
  )
}

// 更新嵌套对象
function Information() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg'
    }
  })
  const onNameChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setPerson({
      ...person,
      name: event.target.value
    })
  }
  const handleCityChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: event.target.value
      }
    })
  }
  const handleTitleChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: event.target.value
      }
    })
  }
  return (
    <div>
      <form>
        <label htmlFor="">
          <input type="text" value={person.name} onChange={ onNameChanged } />
        </label>
        <label htmlFor="">
          <input type="text" value={person.artwork.city} onChange={ handleCityChanged } />
        </label>
        <label htmlFor="">
          <input type="text" value={person.artwork.title} onChange={ handleTitleChanged } />
        </label>
      </form>
    </div>
  )
}

// 使用 use-immer 更新数据
function Player() {
  const [player, setPlayer] = useImmer({
    firstName: '',
    lastName: ''
  })
  const handleUpdateFirstName = (event: ChangeEvent<HTMLInputElement>): void => {
    setPlayer(draft => {
      draft.firstName = event.target.value.trim()
    })
  }
  const handleUpdateLastName = (event: ChangeEvent<HTMLInputElement>): void => {
    setPlayer(draft => {
      draft.lastName = event.target.value.trim()
    })
  }
  return (
    <form>
      <label htmlFor="">
        <input
          type="text"
          placeholder='firstName'
          onChange={handleUpdateFirstName}
          value={player.firstName}
        />
      </label>
      <label htmlFor="">
        <input
          type="text"
          placeholder='lastName'
          onChange={handleUpdateLastName}
          value={player.lastName}
        />
      </label>
    </form>
  )
}

// useReducer
const initialState = { count: 0 }
const reducer = (draft: Draft<{ count: number }>, action: { type: string }) => {
  switch (action.type) {
    case 'reset':
      return initialState
    case 'increment':
      return void draft.count ++
    case 'decrement':
      return void draft.count --
  }
}
function ReducerApp() {
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  return (
    <div>
      <button onClick={() => {
        dispatch({
          type: 'increment'
        })
      }}>increment</button>
      <button>{state.count}</button>
      <button
        onClick={() => {
          dispatch({
            type: 'decrement'
          })
        }}
      >decrement</button>
      <button
        onClick={() => {
          dispatch({
            type: 'reset'
          })
        }}
      >reset</button>
    </div>
  )
}

const App = () => {
  return (
    <>
      <MovingDot />
      <Counter />
      <Form />
      <Information />
      <Player />
      <ReducerApp/>
    </>
  )
}

export default App