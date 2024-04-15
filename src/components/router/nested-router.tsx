// 嵌套路由
import React from 'react'
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'

const Mine = () => {
  return (
    <div>
      <div>我的主页12345</div>
      <Outlet/>
    </div>
  )
}
const UserCenter = () => {
  return (
    <div>用户中心</div>
  )
}
const Home = () => {
  return (<div>我是首页</div>)
}

// router
const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/mine',
    element: <Mine />,
    children: [
      {
        path: 'user',
        element: <UserCenter/>
      }
    ]
  }
])

const NestRouterApp = () => {
  return (
    <RouterProvider router={ router }/>
  )
}

export default NestRouterApp