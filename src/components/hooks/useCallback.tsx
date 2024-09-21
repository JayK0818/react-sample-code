import React, { useCallback, useEffect, useState, memo } from 'react'
import { Button } from 'antd'

const ChildComponent: React.FC<{
  fn: () => void
}> = memo((props) => {
  console.log('我重新渲染了吗')
  return (
    <div>
      我是子组件
      <Button
        onClick={props.fn}
        type={'primary'}
      >child component click</Button>
    </div>
  )
})

const Counter: React.FC = () => {
  const [count, setCount] = useState(0)
  // 此用法 函数只会执行一次
/*   const handleClick = useCallback(() => {
    setCount(count + 1)
  }, []) */

/*   const fn = () => {
    console.log('hello me')
  } */

  const fn = useCallback(() => { // 传递给自组件, 此时只会执行一次
    console.log('hello me')
  }, [])

/*   const handleClick = useCallback(() => {
    console.log('count', count) // 此处count会一直更新
    setCount(count + 1)
  }, [count]) */ // 将count 作为依赖项传递
  // ---------- 传递updater function 以移除依赖 --------
  const handleClick = useCallback(() => {
    console.log('count', count) // 此处count一直为0 ？？？？？
    setCount(count => count + 1)
  }, [])
  return (
    <div>
      <Button onClick={handleClick}>Click Me {count} times</Button>
      <ChildComponent fn={ fn } />
    </div>
  )
}

/**
 * 如果你正在编写一个自定义Hook, 建议将它返回的任何函数包裹在 useCallback中。
*/

// 不能在循环列表中调用useCallback
// -----------------错误的案例-----------------
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
  },
  {
    id: 3,
    firstName: 'kevin',
    lastName: 'durant'
  }
]
const PlayerList: React.FC = () => {
  return (
    <ul>
      {
        // 错误用法
        playerList.map(player => {
          // eslint-disable-next-line
          const handleClick = useCallback(() => {
            console.log('player', player)
          }, [player])
          return (
            <li key={player.id} onClick={ handleClick }>
              <span>{player.firstName}</span>
              <span>{ player.lastName }</span>
            </li>
          )
        })
      }
    </ul>
  )
}

const PlayerItem = (props: any) => {
  const handleClick = useCallback(() => {
    console.log('player-props:', props)
  }, [props])
  return (
    <li onClick={ handleClick }>
      <span>{ props.firstName}</span>
      <span>{ props.lastName }</span>
    </li>
  )
}

const NewPlayerList: React.FC = () => {
  return (
    <ul>
      {playerList.map(player => (
        <PlayerItem key={player.id} {...player} />
      )) }
    </ul>
  )
}

const App = () => {
  return (
    <React.Fragment>
      <Counter />
      <hr></hr>
      <PlayerList />
      <hr></hr>
      <NewPlayerList/>
    </React.Fragment>
  )
}

export default App