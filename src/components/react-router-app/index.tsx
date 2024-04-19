import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './views/Home'
import NotFound from './views/NotFound'
import Player from './views/Player'
import EditPlayer from './views/EditPlayer'
import { playerList } from './data'
import type { PlayerList } from './interface'

const getPlayerList = async (): Promise<{ playerList: PlayerList[] }> => {
  const data:PlayerList[] = await new Promise(resolve => {
    window.setTimeout(() => {
      resolve(playerList as PlayerList[])
    }, 2500)
  })
  return {
    playerList: data
  }
}

const createPlayer = async ({ request, params }: any): Promise<any> => {
  console.log('执行action了吗?', request, params)
  const data = await new Promise(resolve => {
    window.setTimeout(() => {
      resolve({
        playerList: [
          {
            firstName: 'Kevin',
            lastName: 'Love',
            id: 5,
            avatar: '11112344',
            twitter: '48632599'
          }
        ]
      })
    }, 2000)
  })
  return data
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
    loader: getPlayerList,
    action: createPlayer,
    children: [
      {
        index: true,
        element: (<div>我是一个没有选中任何球员时显示的页面</div>)
      },
      {
        path: 'player/:id',
        element: <Player/>
      },
      {
        path: 'player/:id/edit',
        element: <EditPlayer />,
        loader: async ({ params }) => {
          console.log(params)
          const target = playerList.find(p => p.id === Number(params.id))
          await new Promise(resolve => window.setTimeout(resolve, 2000))
          return target
        }
      }
    ]
  }
])

const ReactRouterApp = () => (
  <RouterProvider router={router} />
)

export default ReactRouterApp