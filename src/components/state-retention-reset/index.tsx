// 状态保留和重置
import React, { useState } from 'react'
import type { ChangeEvent } from 'react'
// 状态与渲染树中的位置相关
const Counter = () => {
  const [count, setCount] = useState(0)
  const handleClick = (): void => {
    setCount(count + 1)
  }
  return (
    <button onClick={handleClick}>{ count }</button>
  )
}

// 相同位置的不同组件
const SamePositionDiffComponent = () => {
  const [isVisible, setVisible] = useState(false)
  const handleToggleChecked = (): void => {
    setVisible(!isVisible)
  }
  return (
    <div>
      {/* 该组件状态会重置 */}
      {isVisible ? <Counter /> : <p>hello world!</p>}
      <label htmlFor="">
        <input type='checkbox' onChange={handleToggleChecked} />
        组件状态重置
      </label>
    </div>
  )
}

// 在相同位置 重置state
const PersonCounter = ({ name }: any) => {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>{ name } ---- click me { count } times</button>
  )
}
const SamePositionResetState = () => {
  const [isPlayerA, setIsPlayerA] = useState(true)
  return (
    <div>
      {/* 切换player时 组件状态会保留 */}
{/*       {
        isPlayerA ? <PersonCounter name='kyrie'/> : <PersonCounter name='irving'/>
      } */}
      {
        isPlayerA ? <PersonCounter name='kyrie' key={ 'kyrie' } /> : <PersonCounter name='irving' key='irving'/>
      }
      <button onClick={() => setIsPlayerA(!isPlayerA)}>next player</button>
    </div>
  )
}

// 修复bug
const Field = ({ label }: any) => {
  const [text, setText] = useState('')
  const handleChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value.trim())
  }
  return (
    <label>
      {label}
      <input type="text" value={text} onChange={ handleChanged } />
    </label>
  )
}
const ExchangeNameApp = () => {
  const [isReverse, setIsReverse] = useState(false)
  return (
    <div>
      {isReverse ? (
          <>
            <Field label={'姓'} key={'first' } />
            <Field label={'名'} key={'last' } />
          </>
      ) : (
          <>
            <Field label={ '名' } key={'last' } />
            <Field label={' 姓' } key={'first' }/>
          </>
      )}
      <button onClick={ () => setIsReverse(!isReverse) }>切换姓名</button>
    </div>
  )
}

// 列表中错位的 state
const contacts = [
  { id: 0, name: 'Alice', email: 'alice@mail.com' },
  { id: 1, name: 'Bob', email: 'bob@mail.com' },
  { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
]


// 当向一个组件添加状态时，那么可能会认为状态“存在”在组件内。但实际上，状态是由 React 保存的。React 通过组件在渲染树中的位置将它保存的每个状态与正确的组件关联起来
const Contact = ({ contact }: any) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <p>{contact.name}</p>
      {
        expanded && (<p>{ contact.email }</p>)
      }
      <button
        onClick={() => { setExpanded(!expanded) }}
      >{expanded ? '隐藏' : '显示'}邮箱</button>
    </>
  )
}

const ContactList = () => {
  const [reverse, setReverse] = useState(false)
  const displayedContacts = [...contacts]
  if (reverse) {
    displayedContacts.reverse()
  }
  const handleToggleChecked = (): void => {
    setReverse(!reverse)
  }
  return (
    <>
      <label htmlFor="">
        <input type="checkbox" checked={reverse} onChange={handleToggleChecked} />
        以相反的顺序显示
      </label>
      {
        displayedContacts.map((contact, i) => {
          return (<Contact contact={contact} key={ contact.id } />)
        })
      }
    </>
  )
}


const App = () => {
  const [isShow, setIsShow] = useState(true)
  const handleToggleShow = (): void => {
    setIsShow(!isShow)
  }
  return (
    <div>
      <Counter />
      {/* 在树中相同的位置渲染相同的组件时, React才会一直保留着组件的state */}
      { isShow ? <Counter/> : null }
      <Counter />
      <input type="checkbox" checked={isShow} onChange={handleToggleShow} />
      <hr />
      <SamePositionDiffComponent />
      <hr />
      <SamePositionResetState />
      <hr />
      <ExchangeNameApp />
      <hr/>
      <ContactList/>
    </div>
  )
}

export default App