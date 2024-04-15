// 自定义hook
import React, { useEffect, useState } from 'react'
// import type { MouseEvent } from 'react'
import { useMouse as useAHookMouse, useRequest, useTitle } from 'ahooks'

// 一个自定义Hook, 修改页面标题
const useSetTitle = (title: string): void => {
  useEffect(() => {
    document.title = title
  }, [])
}

// 获取鼠标位置
const useMouse = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })
  const listenMouseMove = (event: MouseEvent): void => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    })
  }
  useEffect(() => {
    console.log('组件mounted')
    window.addEventListener('mousemove', listenMouseMove, false)
    return () => {
      console.log('组件卸载了')
      window.removeEventListener('mousemove', listenMouseMove, false)
    }
  }, [])
  return position
}

const SetTitleApp = () => {
  useSetTitle('hello world')
  useSetTitle('你好, 世界')
  useTitle('我是自定义hook修改的标题')
  return (
    <></>
  )
}

const MouseMoveApp = () => {
  const { x, y } = useMouse()
  return (
    <div>
      <div>{x}, { y }</div>
    </div>
  )
}

// 模拟异步获取数据
const useAsyncHook = () => {
  const [loading, setLoading] = useState(false)
  const [playerList, setPlayerList] = useState<Array<{ firstName: string, lastName: string, age: number }>>([])
  const getPlayerList = () => {
    setLoading(true)
    window.setTimeout(() => {
      setPlayerList([
        {
          firstName: 'kyrie',
          lastName: 'irving',
          age: 32
        },
        {
          firstName: 'lebron',
          lastName: 'james',
          age: 39
        }
      ])
      setLoading(false)
    }, 3000)
  }
  useEffect(() => {
    getPlayerList()
  }, [])
  return {
    loading,
    playerList
  }
}

const App = () => {
  const [visible, setVisible] = useState(true)
  const { loading, playerList } = useAsyncHook()
  // 第三方hook
  const mouse = useAHookMouse()
  const { data, error, loading: spinning } = useRequest(() => {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        const n = Math.random()
        if (n > 0.5) {
          resolve('hello')
        }
        reject('Something went wrong')
      }, 2600)
    })
  })
  // console.log('mouse-props:', mouse)
  return (
    <>
      <SetTitleApp />
      { visible ? <MouseMoveApp/> : null }
      <button onClick={() => setVisible(!visible)}>{visible ? '隐藏' : '显示'}</button>
      <div>
        {loading ? <p>Loading...</p> : (
          <ul>
            {playerList.map((player, i) => (
              <li key={ i }>{player.firstName} - {player.lastName} - { player.age }</li>
            )) }
          </ul>
        ) }
      </div>
      <div>
        <p>第三方hooks</p>
        {spinning ? <p>Spinning...</p> : (
          <>
            {error ? <div style={{ color: 'red' }}>{JSON.stringify(error)}</div> : <div>{ data as string }</div> }
          </>
        ) }
      </div>
    </>
  )
}

export default App