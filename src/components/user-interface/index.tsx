import React from "react";

function Profile() {
  return (
    <img
      style={{ width: 100 }}
      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201905%2F03%2F20190503231639_dtlnx.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713962702&t=63522c9f9d6156fde185733dfc7631f2" alt="" />
  );
}

// 在jsx中使用变量
const msg = 'Hello World'
function TodoItem() {
  return <div>{ msg }</div>
}

const toUpperCase = (string: string): string => {
  return string.toLocaleUpperCase()
}
// 使用函数
function Greet() {
  return <div>{ toUpperCase('hello world') }</div>
}
// 使用对象
function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  )
}

function Gallery() {
  return (
    <div>
      <h2>Amazing scientists</h2>
      <Profile />
      <Profile />
      <TodoItem />
      <Greet />
      <TodoList/>
    </div>
  )
}

export default Gallery