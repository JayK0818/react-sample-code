import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter, Outlet, useLoaderData } from 'react-router-dom'

const Team = () => {
  const data = useLoaderData()
  console.log('team-data:', data)
  return (
    <div>
      <div>我是Team页面</div>
      <Outlet/>
    </div>
  )
}
// 访问player时, team组件的数据请求和player组件的数据请求是 并发的
const Player = () => {
  const data = useLoaderData()
  console.log('player-data', data)
  return (
    <div>我是Player页面</div>
  )
}

const Coach = () => {
  return (
    <div>我是教练页面</div>
  )
}

const router = createBrowserRouter([
  {
    path: '/team',
    element: <Team />,
    loader: async ({ request, params }) => {
      const data = await new Promise(resolve => {
        setTimeout(() => {
          resolve('Hello World!!!')
        }, 6000)
      })
      return data
    },
    children: [
      {
        path: 'player',
        element: <Player />,
        loader: async () => {
          const data = await new Promise(resolve => {
            setTimeout(() => {
              resolve('你好世界')
            }, 9000)
          })
          return data
        }
      },
      {
        path: 'coach',
        element: <Coach/>
      }
    ]
  }
])

const DataLoadingApp = () => {
  return (
    <RouterProvider router={ router } />
  )
}

export default DataLoadingApp