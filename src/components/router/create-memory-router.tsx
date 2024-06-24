import { RouterProvider, createMemoryRouter, Link, Outlet } from 'react-router-dom'
import * as React from 'react'

const Home = () => {
  return (
    <div>Hello, Home page!!</div>
  )
}

const User = () => {
  return (
    <div>Hello, User page!!</div>
  )
}

const router = createMemoryRouter([
  {
    path: '/',
    element: (
      <div>
        <Link to='/home'>首页</Link>
        <Link to='/user'>用户</Link>
        <div>
          <Outlet/>
        </div>
      </div>
    ),
    children: [
      {
        path: 'home',
        element: <Home/>
      },
      {
        path: 'user',
        element: <User/>
      }
    ]
  }
])

const App = () => {
  return <div>
    <RouterProvider router={router} />
  </div>
}

export default App