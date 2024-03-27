import React, { useState } from 'react'
import type { MouseEvent } from 'react'

function Button() {
  const [count, setCount] = useState(0)
  const handleIncrement = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log('event', event)
    setCount(count + 1)
  }
  return (
    <button onClick={ handleIncrement }>click { count } times</button>
  )
}

// 读取props
function AlertButton({ message, children }: { message: string, children: string }) {
  const handleClick = () => {
    console.log(message)
  }
  return (<button onClick={ handleClick }>{ children }</button>)
}

// 事件处理函数作为 prop
function PlayButton({ onClick }: any) {
  return (<button onClick={onClick}>click me</button>)
}

// 事件冒泡
function ToolBar() {
  return (
    <div
      onClick={() => { console.log('parent element clicked') }}
      onClickCapture={() => { console.log('事件捕获...') }}
    >
      <button onClick={() => {console.log('button clicked')}}>事件冒泡</button>
    </div>
  )
}
// 执行父级函数之前/之后 执行一段逻辑
/* function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
} */

const App = () => {
  const handleClick = (): void => {
    console.log('我是父组件的函数')
  }
  return (
    <>
      <Button />
      <AlertButton message='正在播放'>播放电影</AlertButton>
      <AlertButton message='正在上传'>上传文件</AlertButton>
      <PlayButton onClick={handleClick} />
      <ToolBar/>
    </>
  )
}

export default App