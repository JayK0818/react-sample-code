// 空间换时间
import React, { useState, useMemo, useCallback, memo } from 'react'
import type { FC } from 'react'

const Counter: FC = () => {
  const [count, setCount] = useState(0)
  const handleIncrement = (): void => {
    setCount(count + 1)
  }
/*   const sum = useMemo(() => {
    let s = 0
    for (let i = 0; i < 100; i++) {
      s += i
    }
    console.log('计算了吗')
    return s
    // 每次 count更新的时候 更新
  }, [count]) */
  const sum = useMemo(() => {
    let s = 0
    for (let i = 0; i < 100; i++) {
      s += i
    }
    // 未依赖其他数据, 只执行一次
    console.log('计算了吗')
    return s
  }, [])
  return (
    <div>
      <button
        onClick={handleIncrement}
      >click {count} times</button>
      <div>和: { sum }</div>
    </div>
  )
}

const set = new Set()

const Child = memo(({ fn }: any) => {
  console.log('child rerender')
  return (
    <div></div>
  )
})

const ThemeButton = () => {
  const [count, setCount] = useState(0)
  const fn1 = useCallback(() => {
    console.log('hello')
  }, [])
  const fn2 = () => {
    console.log('world')
  }
  const handleIncrement = (): void => {
    setCount(count + 1)
/*     set.add(fn1)
    console.log(set.size) */
    set.add(fn2)
    console.log(set.size)
  }
  return (
    <>
      {/* 在子组件使用memo时, 传递fn1时, child只会更新一次, 而传递fn2时, 每次child都会更新 */}
      <Child fn={ fn2 } />
      <button onClick={handleIncrement}>Hello World! { count } times~</button>
    </>
  )
}

const Player = () => {
  const [name, setName] = useState('name')
  const [age, setAge] = useState(30)
  // -------------- 最小化props的变化 ---------------
  const person = useMemo(
    () => ({ name, age }),
    []
  )
}

const App: FC = () => {
  return (
    <>
      <Counter />
      <ThemeButton/>
    </>
  )
}

export default App