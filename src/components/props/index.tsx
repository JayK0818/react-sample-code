import { useState, useEffect } from 'react'
// 传递props
function TodoItem({ id, text, completed }: { id: number, text: string, completed:boolean }) {
  return (
    <li>{text} - { completed ? '已完成'  : '未完成'}</li>
  )
}

function TodoList() {
  const list = [
    { id: 1, text: 'hello world', completed: false },
    { id: 2, text: '你好 世界', completed: true }
  ]
  return (
    <ul>
      {
        list.map(todo => (<TodoItem {...todo} key={ todo.id} />))
      }
    </ul>
  )
}

// 将jsx作为子组件传递
function Layout({ children }: { children: any  }) {
  return (
    <div>{ children }</div>
  )
}

function Banner() {
  return <div>我是顶部导航栏</div>
}
function Footer() {
  return <div>我是底部</div>
}

function Page() {
  return (
    <Layout>
      <Banner />
      <Footer />
      我是一段文本内容
    </Layout>
  )
}

// props 随时间变化
function Clock({ color, time }: any) {
  return (
    <h1 style={{ color: color }}>{ time }</h1>
  )
}
function Selector() {
  const [date, setDate] = useState(new Date().toLocaleTimeString())
  useEffect(() => {
    window.setInterval(() => {
      setDate(new Date().toLocaleTimeString())
    }, 500)
  })
  return (
    <div>
      <Clock time={ date } />
    </div>
  )
}
export default Selector