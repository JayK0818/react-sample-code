# Tanstack-Router

## install

```shell
npm install @tanstack/react-router
# or
pnpm add @tanstack/react-router
#or
yarn add @tanstack/react-router

# 插件
npm install @tanstack/router-devtools --save
```

## Devtools

```tsx
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools/>
    </>
  ),
})
```

## Root Route

  The root route is the top-most route in the entire tree and encapsulates all other routes as children.

```tsx
import { createRootRoute } from '@tanstack/react-router'

const Route = createRootRoute()

// getParentRoute
const route = createRoute({
  getParentRoute: () => Route,
  component: <User/>,
  path: '/user'
})
```

## 