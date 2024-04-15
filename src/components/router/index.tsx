import React from 'react'
import { createBrowserRouter, RouterProvider, Route, Routes, Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div>我是管理员页面</div>
  )
}
const Detail = () => {
  return (
    <div>我是详情页</div>
  )
}

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <Admin/>
  },
  {
    path: '/detail',
    element: <Detail/>
  }
])

const BaseRouterApp = () => {
  return (
    <div>
      <RouterProvider router={ router } />
    </div>
  )
}

export default BaseRouterApp