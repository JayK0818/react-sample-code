import React, { createContext, useState, useContext } from 'react'
import { DatePicker, Space } from 'antd'

const CounterContext = createContext(0)
const Button = () => {
  const count = useContext(CounterContext)
  return (
    <button>我是子级的子级组件 ---- { count }</button>
  )
}

const CounterButton = () => {
  return (<Button></Button>)
}

const CounterContextComponent = () => {
  const [count, setCount] = useState(0)
  const handleClick = (): void => {
    setCount(count + 1)
  }
  return (
    <>
      <DatePicker/>
      <button onClick={handleClick}>click me { count } times</button>
      <CounterContext.Provider value={count}>
        <CounterButton/>
      </CounterContext.Provider>
    </>
  )
}

export default CounterContextComponent