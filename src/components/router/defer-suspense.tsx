import React, { Suspense } from 'react'
import {
  createBrowserRouter, RouterProvider, useLoaderData, Await,
  NavLink,
  defer,
  Outlet,
  useNavigation
} from 'react-router-dom'
const playerList = [
  {
    firstName: 'kyrie',
    lastName: 'irving',
    id: 1
  },
  {
    firstName: 'kevin',
    lastName: 'irving',
    id: 2
  }
]

const Home = () => {
  const navigation = useNavigation()
  return (
    <div>
      <p>我是首页</p>
      {navigation.state === 'loading' && <div style={{ color: 'red'}}>正在加载...</div> }
      <NavLink to='player-list'>跳转至球员页面</NavLink>
      <Outlet/>
    </div>
  )
}

const PlayerList = () => {
  // @ts-ignore
  const { list } = useLoaderData()
  console.log(playerList)
  return (
    <div>
      {/*  Todo: 效果未实现*/}
      <div>我是球员列表页面</div>
      <Suspense fallback={<div style={{color: '#1890ff'}}>Loading...</div>}>
        <Await resolve={list}>
          {(data) => (
            <ul>
              {data.map((player: any) => (
                <li key={ player.id }>{player.firstName} - { player.lastName }</li>
              )) }
            </ul>
          ) }          
        </Await>
      </Suspense>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'player-list',
        element: <PlayerList />,
        loader: async () => {
          const list = await new Promise(resolve => {
            window.setTimeout(() => {
              resolve(playerList)
            }, 2000)
          })
          return defer({ list })
        }
      }
    ]
  }
])

const DeferSuspenseApp = () => {
  return <RouterProvider router={ router } />
}

export default DeferSuspenseApp