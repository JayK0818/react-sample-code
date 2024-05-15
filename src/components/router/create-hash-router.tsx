import { createHashRouter, RouterProvider, NavLink } from 'react-router-dom'
import React from 'react'

const Home = () => {
  return (
    <div>我是首页</div>
  )
}

const User = () => {
  return (
    <div>我是用户页面</div>
  )
}

const router = createHashRouter([
  {
    path: '/',
    element: (<div>Hello World!!! <NavLink to='/home'>首页</NavLink></div>)
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/user',
    element: <User/>
  }
])

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App