# Ref

  当你 希望组件 '记住' 某些信息, 但又不想让这些信息 触发新的渲染, 可以使用ref

```jsx
import { useRef, useEffect } from 'react'

function Counter () {
  const countRef = useRef(0)
  useEffect(() => {
    countRef.current = 1
  }, [])
}
```
  ref时一个普通的JavaScript对象, 具有可以被读取和修改的 **current** 属性。 组件不会在每次递增时重新渲染, 与state一样, React会在每次
  重新渲染之前保留ref. 设置state会重新渲染组件, 但是更改 ref 不会。

1. 存储 **timeout ID**
2. 存储和操作 **DOM 元素**
3. 存储不需要被用来计算JSX的其他对象

# forwardRef

  `forwardRef`允许组件使用 `ref` 将DOM节点暴露给父组件

```jsx
import { forwardRef, useRef } from 'react'
const MyInput = forwardRef(function MyInput(props, ref) {
  return (
    <input ref={ ref }/>
  )
})

const Form = () => {
  const ref = useRef(null)
  return (
    <MyInput ref={ref}/>
  )
}
```

# useImperativeHandle

  暴露命令式句柄而非直接暴露DOM节点

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react'

const MyInput = forwarderRef(function (props, ref) {
  const inputRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      focus () {
        inputRef.current.focus()
      }
    }
  }, [])
})

const Form = () => {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.focus()  // 此时current为自组件暴露出来的句柄, 而非DOM节点
  }, [])
  return (
    <input
      ref={ref}
    />
  )
}
```