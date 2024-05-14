/**
 * When users navigate around the app, the data for the next page is loaded before the page is rendered
 * It is important to provide user feedback during this time
*/
import React from 'react'
import { createBrowserRouter, RouterProvider, useNavigation, Outlet, useLoaderData, useLocation, NavLink } from 'react-router-dom'

const Home = () => {
  const navigation = useNavigation()
  return (
    <div>
      <div>我是首页</div>
      {navigation.state === 'loading' && <div style={{ color: '#1890ff' }}>Loading...</div>}
      {/* loading效果需要手动跳转, 地址栏直接输入 /user 无效果 */}
      <NavLink to='/user' state={{ from: 'home' }}>跳转至用户页面</NavLink>
      <Outlet/>
    </div>
  )
}

const User = () => {
  const data = useLoaderData()
  const location = useLocation()
  console.log(data)
  console.log('location:', location.state, window.history.state)
  return (
    <div>
      <div>用户页面12234455</div>
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
        element: <User />,
        // 进入user 组件时执行的逻辑
        loader: async () => {
          const data = await new Promise(resolve => {
            setTimeout(() => {
              resolve('hello')
            }, 2000)
          })
          return data
        }
      }
    ]
  }
])

const PendingNavigateApp = () => {
  return (
    <RouterProvider router={ router } />
  )
}

export default PendingNavigateApp