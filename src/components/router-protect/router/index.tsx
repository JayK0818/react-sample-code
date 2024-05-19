import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home'
import Login from '../pages/Login'
import AuthRoute from '../pages/AuthRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute />,
    children: [
      {
        path: 'home',
        element: <Home/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  }
]);

export default router