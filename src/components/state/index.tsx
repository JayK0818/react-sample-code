import React, { useState } from 'react'
import { sculptureList } from './data'

const Gallery = () => {
  // 局部变量无法在多次渲染中持久保存
  const [index, setIndex] = useState(0)
  const sculpture = sculptureList[index]
  const handleNext = (): void => {
    if (index === sculptureList.length - 1) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
  }
  return (
    <div>
      <button onClick={handleNext}>next</button>
      <h2>{sculpture.name} by {sculpture.artist}</h2>
      <h3>{index + 1} of {sculptureList.length}</h3>
      <p>{sculpture.description}</p>
    </div>
  )
}
// 一段demo
const FeedbackForm = () => {
  const [name, setName] = useState('')
  const handleClick = () => {
    setName(prompt('What is your name?') as string)
    alert(`Hello, ${name}`)
  }
  return (
    <button onClick={handleClick}>Greet</button>
  )
}

// 在严格模式下，React 会执行每个更新函数两次（但是丢弃第二个结果）以便帮助你发现错误。

// 一次多次更新count
function Counter() {
  const [count, setCount] = useState(0)
  const handleClick = (): void => {
/*  
    一次 直接更新 3, react会将此函数加入更新队列, 在下次渲染期间, 会便利队列并给你更新之后的最终state
    setCount(count => count + 1)
    setCount(count => count + 1)
    setCount(count => count + 1) */

    // 一次只更新 +1
/*     setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1) */

    // 每个渲染（以及其中的函数）始终“看到”的是 React 提供给这个 渲染的 state 快照
/*     setCount(count + 5)
    window.setTimeout(() => {
      // 这个值是 和用户交互时的 那一刻的值
      console.log(count)
    }, 2000) */

    // 先加5, 然后+1, 最后结果为 + 6
/*     setCount(count + 5)
    setCount(count => count + 1) */

    // 每次+3
    setCount(count => count + 2)
    setCount(count + 3)
  }
  return (
    <button onClick={handleClick}>click +3 --- { count }</button>
  )
}

// 批量更新数据
let timer: any = null
function delay(second: number) {
  return new Promise(resolve => {
    timer = setTimeout(resolve, second * 1000)
  })
}
function RequestTracker() {
  const [pending, setPending] = useState(0)
  const [completed, setCompleted] = useState(0)
  const handleClick = async (): Promise<void> => {
    if (timer) {
      return
    }
    setPending(p => p + 1)
    await delay(2)
    setPending(p => p - 1)
    setCompleted(c => c + 1)
    if (timer) {
      window.clearTimeout(timer)
      timer = null
    }
  }
  return (
    <>
      <h3>等待 {pending}</h3>
      <h3>完成 {completed}</h3>
      <button onClick={ handleClick }>购买</button>
    </>
  )
}

const App = () => {
  return (
    <>
      {/* state是隔离 且私有的 */}
      <Gallery />
      <Gallery />
      <FeedbackForm />
      <Counter />
      <RequestTracker/>
    </>
  )
}

export default App