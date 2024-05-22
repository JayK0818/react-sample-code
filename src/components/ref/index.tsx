import React, { useRef, useEffect, useState } from 'react'
import { Button } from 'antd'

// 使用 useRef 清除定时器
const RefTimerApp = () => {
  const timerRef = useRef<null | number>(null)
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (timerRef.current) return
    timerRef.current = window.setInterval(() => {
      console.log('hello')
    }, 1000)
    console.log(timerRef.current)
  }, [])
  const handleClick = (): void => {
    setCount(count + 1)
    if (count === 3) {
      console.log('hello, 清除了吗')
      timerRef.current && window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }
  return (
    <div>
      <Button onClick={handleClick}>click me { count } times</Button>
    </div>
  )
}

const UnClearIntervalApp = () => {
  const [count, setCount] = useState(0)
  // let timer: null | number = null // 每次重新更新 timer为null
  const [timer, setTimer] = useState<null | number>(null)
  const handleClick = (): void => {
    setCount(count + 1)
    if (count === 3) {
      console.log('清除了吗？', timer)
      timer && window.clearInterval(timer)
    }
  }
  useEffect(() => {
    console.log('执行了吗')
    const t = window.setInterval(() => {
      console.log('world!!!')
    }, 1000)
    setTimer(t)
    console.log('timer:', timer)
  }, [])
  return (
    <div>
      <Button type={ 'primary' } onClick={handleClick}>click me { count } times</Button>
    </div>
  )
}

const App = () => {
  return (
    <>
      {/* <RefTimerApp /> */}
      <UnClearIntervalApp/>
    </>
  )
}

export default App