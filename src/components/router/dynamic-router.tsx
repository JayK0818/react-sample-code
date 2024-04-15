// 动态路由
import { RouterProvider, createBrowserRouter, Link, Outlet, useParams } from 'react-router-dom'
import React, { useState } from 'react'

const PlayerList = () => {
  const [playerList, setPlayerList] = useState([
    {
      id: 1,
      firstName: 'lebron',
      lastName: 'james'
    },
    {
      id: 2,
      firstName: 'kyrie',
      lastName: 'irving'
    }
  ])
  return (
    <div>
      <ul>
        {
          playerList.map(player => (
            <li key={player.id}>
              <Link to={'/player/' + player.id}>{player.firstName} - { player.lastName }</Link>
            </li>
          ))
        }
      </ul>
      <Outlet/>
    </div>
  )
}

const PlayerInfo = () => {
  const params = useParams()
  return (
    <div>球员详情 --- { params.id }</div>
  )
}

const router = createBrowserRouter([
  {
    path: '/player',
    element: <PlayerList />,
    children: [
      {
        path: ':id',
        element: <PlayerInfo/>
      }
    ]
  }
])

const DynamicRouterApp = () => {
  return (
    <RouterProvider router={ router } />
  )
}

export default DynamicRouterApp