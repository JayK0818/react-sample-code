// useRef
import React, { useRef, useState } from 'react'

const InputRefDemo = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleInputFocus = (): void => {
    console.log(inputRef)
    inputRef.current?.focus()
  }
  return (
    <div>
      <input type="text" defaultValue={'hello world'} ref={inputRef} />
      <button onClick={handleInputFocus}>获取焦点</button>
    </div>
  )
}

// useRef 可以传递js变量, 但是更新值 不会出发 rerender
const UnRenderDemo = () => {
  const name = useRef<string>('hello')
  const [count, setCount] = useState(0)

  const handleChange = (): void => {
    name.current = 'hello world'
    // 也没上不会更新为 hello world, 组件不会重新render
    console.log(name.current)

    // useState 会出发组件重新渲染, 此时 name.current 会更新
    setCount(count + 1)
  }
  return (
    <div>
      <p>name: {name.current}</p>
      <button onClick={handleChange}>change name { count }</button>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <InputRefDemo />
      <UnRenderDemo/>
    </div>
  )
}

export default App