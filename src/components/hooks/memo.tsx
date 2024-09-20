import React, { useState, memo } from 'react'

const Child = () => {
  console.log('字组件更新了吗?')
  return (
    <div>我是count的字组件</div>
  )
}

const MemoChild: React.FC<{count?: number}> = memo(() => {
  console.log('我是memo包裹的字组件')
  return <div>我是count的字组件</div>
})

const MemoApplication = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>click {count} times</button>
      <Child />
      {/* memo包裹的字组件 传递 count时更新， props无变化时不更新 */}
      <MemoChild count={count} />
      <MemoChild/>
    </div>
  )
}

export default MemoApplication