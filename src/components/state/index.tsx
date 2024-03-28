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
      <button onClick={ handleNext }>next</button>
      <h2>{sculpture.name} by {sculpture.artist}</h2>
      <h3>{index + 1} of {sculptureList.length}</h3>
      <p>{ sculpture.description }</p>
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

const App = () => {
  return (
    <>
      {/* state是隔离 且私有的 */}
      <Gallery />
      <Gallery />
      <FeedbackForm/>
    </>
  )
}

export default App