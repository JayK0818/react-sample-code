import {
  Outlet,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/user" className="[&.active]:font-bold">
          User
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    )
  },
})

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/user',
  component: function About() {
    return <div className="p-2">Hello from About!</div>
  },
})
// @ts-ignore   (此处会报错)?????
const routeTree = rootRoute.addChildren([indexRoute, userRoute])

const router = createRouter({ routeTree })

export default router