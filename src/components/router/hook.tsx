import React from 'react'
import { Link, NavLink, createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'

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
    lastName: 'irving'
  }
]

const PlayerList = () => {
  return (
    <ul>
      {
        playerList.map(player => (
          // reloadDocument 页面会刷新
          <li key={ player.id }>
            <Link
              to={`/player/${player.id}`}
              reloadDocument={false}
            >{player.firstName}</Link>
          </li>
        ))
      }
    </ul>
  )
}
const User = () => {
  return (
    <div>
      <Navigate to='login'/>
      <div>我是用户页面</div>
    </div>
  )
}

const Home = () => {
  return (
    <div>
      <Link to='/player' style={{ marginRight: 10 }}>player</Link>
      <NavLink to='/user'
        className={
          ({ isActive, isPending }) => isPending ? 'pending' : isActive ? 'active' : ''
        }
        style={
          ({ isActive }) => ({
            color: isActive ? 'red' : ''
          })
        }
      >user</NavLink>
      <Outlet />
    </div>
  )
}

const PlayerInfo = () => {
  return (
    <div>我是球员详情页</div>
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
        element: <PlayerList/>
      },
      {
        path: 'player/:id',
        element: <PlayerInfo/>
      }
    ]
  }
])

const App = () => {
  return (<RouterProvider router={ router } />)
}

export default App