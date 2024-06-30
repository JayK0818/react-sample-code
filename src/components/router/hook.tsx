import React from 'react'
import {
  Link, NavLink, createBrowserRouter, RouterProvider, Outlet,
  useLocation, useMatch, useMatches, useNavigate, useNavigation
} from 'react-router-dom'
import { Button, Spin } from 'antd'

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
  const location = useLocation()
  console.log('location:', location)
  const isMatch = useMatch(location.pathname)
  console.log('is-match:', isMatch)
  const matchers = useMatches() // This is most useful for creating abstractions in parent layouts to
  // get access to their child route's data.
  console.log('matchers:', matchers)
  // useNavigate
  const navigate = useNavigate()
  return (
    <div>
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
      <Button onClick={() => navigate(-1)}>编程式导航</Button>
    </div>
  )
}
const User = () => {
  return (
    <div>
      {/* <Navigate to='login'/> */}
      <div>我是用户页面</div>
    </div>
  )
}

const Home = () => {
  const navigation = useNavigation()
  console.log('navigation:', navigation)
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
      { navigation.state === 'loading' ? <Spin/> : null }
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