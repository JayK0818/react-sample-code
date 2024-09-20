import React, { useRef, useEffect, useState } from 'react'
import { Button } from 'antd'

const RefTimerApp = () => { // 此demo可以正常清除
  const timerRef = useRef<null | number>(null)
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(timerRef.current)
    timerRef.current = window.setInterval(() => {
      console.log('hello')
    }, 1000)
    return () => {
      timerRef.current && window.clearTimeout(timerRef.current)
    }
  }, [])
  const handleClick = (): void => {
    setCount(count + 1)
    if (count === 3) {
      console.log('hello, 清除了吗', timerRef.current)
      timerRef.current && window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }
  return (
    <div>
      <Button onClick={handleClick} type={'primary'}>click me { count } times</Button>
    </div>
  )
}

const UnClearIntervalApp = () => {
  const [count, setCount] = useState(0)
  let _timer: null | number = null // 每次重新更新 timer为null
  const [timer, setTimer] = useState<number | null>(null)
  const handleClick = (): void => {
    console.log('_timer:', _timer)
    setCount(count + 1)
    if (count === 3) {
      console.log(timer)
      if (timer) {
        window.clearTimeout(timer)
      }
    }
  }
  // 在测试环境下 执行两次无法清除, 执行一次时 可以清除
  useEffect(() => {
    const t = window.setInterval(() => {
      console.log('world!!!')
    }, 1000)
    _timer = t
    console.log('timer,', t) // 1, 2
    // setTimer(timer.concat(t))
    setTimer(t) // 这里导致组件重新渲染, click事件中的_timer为null
    return () => {
      console.log('我执行了吗?', _timer) // 1
      window.clearTimeout(t)
    }
  }, [])
  return (
    <div style={{ padding: 5 }}>
      <Button type={ 'primary' } onClick={handleClick}>click me { count } times</Button>
    </div>
  )
}

// 自动获取焦点
const FocusInput = () => {
  const inputRef = useRef<null | HTMLInputElement>(null)
  useEffect(() => {
    console.log(inputRef)
    inputRef.current?.focus()
  }, [])
  return (
    <div>
      <input ref={ inputRef } />
    </div>
  )
}

const App = () => {
  return (
    <>
      {/* <RefTimerApp /> */}
      <UnClearIntervalApp/>
      <FocusInput/>
    </>
  )
}

export default App