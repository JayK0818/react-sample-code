import React, { forwardRef, useImperativeHandle, useRef } from 'react'

/* const MyInput = forwardRef<HTMLInputElement, { message: string }>(function MyInput(props, ref) {
  console.log('props:', props)
  return (
    <div>
      <input ref={ ref } placeholder={'点击之后会获取焦点'}/>
    </div>
  )
}) */

// ------------ 暴露命令式句柄 而非 DOM节点 -----------------
interface InputMethodProps {
  focus: () => void
}
const MyInput = forwardRef<InputMethodProps>(function MyInput(props, ref) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current?.focus();
      }
    }
  }, [])
  return (
    <input ref={inputRef} />
  )
})

export default MyInput