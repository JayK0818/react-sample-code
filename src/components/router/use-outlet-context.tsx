// useOutletContext
import { createBrowserRouter, Outlet,  RouterProvider, NavLink , useOutletContext } from 'react-router-dom'
import styles from './router.module.scss';
import classnames from 'classnames'
import React from 'react'
import { Button } from 'antd'

const User = () => {
  // @ts-ignore
  const [count, setCount] = useOutletContext()
  const increment = () => {
  // @ts-ignore
    setCount(c => c + 1)
  }
  return (
    <div>
      <p>User page</p>
      <Button
        type={'primary'}
        size={'small'}
        onClick={increment}
      >Click {count}</Button>
    </div>
  )
}

const Player = () => {
  // @ts-ignore
  const [count, setCount] = useOutletContext()
  return (
    <div>
      <p>Player Page { count } times</p>
    </div>
  )
}

const Home = () => {
  const [count, setCount] = React.useState<number>(0)
  return (
    <div>
      <div>
        <NavLink
          to='/user'
          className={
            classnames([
              styles['router-link']
            ])
          }
          style={({ isActive, isPending }) => ({
            color: isPending ? 'gray' : isActive ? 'red' : ''
          })}
        >user</NavLink>
        <NavLink
          to='/player'
          className={
            classnames([
              styles['router-link']
            ])
          }
          style={({ isActive, isPending }) => ({
            color: isPending ? 'gray' : isActive ? 'red' : ''
          })}
        >player</NavLink>
      </div>
      <Outlet context={ [count, setCount] } />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'user',
        element: <User/>
      },
      {
        path: 'player',
        element: <Player/>
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={ router } />
}

export default App

