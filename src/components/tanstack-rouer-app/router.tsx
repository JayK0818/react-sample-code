import {
  Outlet,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import Home from './pages/Home'
import User from './pages/User'
import Navigation from './pages/Navigation'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navigation/>
      <Outlet />
      <TanStackRouterDevtools/>
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: Home
})

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/user',
  component: User
})

// 嵌套路由
const singerRoute = createRoute({
  getParentRoute: () => userRoute,
  path: 'singer',
  component: function Singer() {
    return (<div>我是歌手</div>)
  }
})
userRoute.addChildren([singerRoute])

const routeTree = rootRoute.addChildren([indexRoute, userRoute])

console.log(routeTree)

const router = createRouter({ routeTree })

export default router