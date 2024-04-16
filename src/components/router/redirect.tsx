import React from 'react'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'

const Home = () => {
  return (
    <div>我是首页</div>
  )
}

const Login = () => {
  return (
    <div>我是登录页面</div>
  )
}

const Register = () => {
  return (
    <div>我是注册页面</div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: async () => {
      const number: number = await new Promise(resolve => {
        const n = Math.random()
        setTimeout(() => {
          resolve(n)
        }, 1200)
      })
      console.log(number)
      if (number > 0.5) {
        return redirect('/login')
      }
      return redirect('/register')
    }
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

const App = () => {
  return (
    <RouterProvider router={ router } />
  )
}

export default App