import React, { useState, memo } from 'react'
import { Button } from 'antd'

//------------------ memo ---------------
// memo 返回一个新的记忆化的组件, React将使用 Object.js 比较每个prop

const playerList = [
  {
    id: 1,
    firstName: 'kyrie',
    lastName: 'irving'
  },
  {
    id: 2,
    firstName: 'lebron',
    lastName: 'james'
  }
]
// 父组件每次点击, PlayerList 和 PlayerItem都会更新
const PlayerItem = (props: any) => {
  console.log('player-item更新了吗')
  return (
    <li>{props.firstName} - { props.lastName }</li>
  )
}

// 在父组件更新时 该组件不更新
const MemoPlayerItem = memo((props: any) => {
  console.log('memo更新了吗')
  return (
    <li>{ props.firstName }</li>
  )
})

const PlayerList = () => {
  console.log('player-list更新了吗?')
  return (
    <ul>
      {playerList.map(player => (
        <React.Fragment key={player.id}>
          <PlayerItem {...player}/>
          <MemoPlayerItem {...player} />
        </React.Fragment>
      )) }
    </ul>
  )
}

// 使用memo包裹的组件
const CounterApp = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Button
        type={'primary'}
        size={'small'}
        onClick={ () => setCount(count + 1)}
      >click me {count} times</Button>
      <hr></hr>
      <PlayerList/>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <div>
      <CounterApp/>
    </div>
  )
}

export default App