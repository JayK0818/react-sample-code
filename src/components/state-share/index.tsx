// 数据共享, 将子组件数据提升至父组件, 状态提升
import React, { useState } from 'react'
function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <>
      <h2>哈萨克斯坦, 阿拉木图</h2>
      <Panel
        title='hello'
        isShow={activeIndex === 0}
        toggleShow={ () => setActiveIndex(0) }
      >阿拉木图人口约200万，是哈萨克斯坦最大的城市。它在 1929 年到 1997 年间都是首都。</Panel>
      <Panel
        title='world'
        isShow={activeIndex === 1}
        toggleShow={ () => setActiveIndex(1) }
      >
        这个名字来自于 <span lang="kk-KZ">алма</span>，哈萨克语中“苹果”的意思，经常被翻译成“苹果之乡”。事实上，阿拉木图的周边地区被认为是苹果的发源地，<i lang="la">Malus sieversii</i> 被认为是现今苹果的祖先。
      </Panel>
    </>
  )
}

function Panel({ isShow, title, children, toggleShow }: any) {
  return (
    <section>
      <h3>{title}</h3>
      {
        isShow ? (
          <p>{ children }</p>
        ) : (
          <button onClick={toggleShow}>显示</button>
        )
      }
    </section>
  )
}

const App = () => {
  return (
    <>
      <Accordion/>
    </>
  )
}

export default App