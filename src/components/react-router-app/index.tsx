import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './views/Home'
import NotFound from './views/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound/>
  }
])

const ReactRouterApp = () => (
  <RouterProvider router={router} />
)

export default ReactRouterApp