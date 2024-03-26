// 条件渲染, 可以使用 if, &&, ? : 运算符选择性地渲染JSX
import React from 'react'

function Item({ name, isPacked }: { name: string, isPacked: boolean }) {
  // return <li>{name} { isPacked ? '✔' : '' }</li>
/*   return (
    <li>
      {isPacked ? (<del>{ name }✔</del>) : (name)}
    </li>
  ) */
  let itemContent = name;
  if (isPacked) {
    itemContent += '✔'
  }
  return <li>{ itemContent }</li>
}

function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item name='宇航服' isPacked={ false } />
        <Item name='带金箔的头盔' isPacked={true} />
        <Item name='Tam 的照片' isPacked={ false } />
      </ul>
    </section>
  )
}

function App() {
  return (
    <>
      <PackingList/>
    </>
  )
}

export default App