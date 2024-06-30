# react-router-dom

## usage

```tsx
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>Hello World</div>
    )
  },
  {
    path: '/home',
    element: (
      <div>我是首页</div>
    ),
    children: [
      // 嵌套路由
      {
        path: 'user',
        element: (<div>我是用户页面</div>)
      },{
        path: 'login',
        element: (<div>登录页面</div>)
      }
    ]
  }
], {
  basename: '/react-app'  // 需要写为根路径, 在页面中跳转时 无需添加此 路径
})
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
```

## NavLink

  A `<NavLink>` is a special kink of `<Link>` that knowns whether or not it is 'active', 'pending', or
  'transitioning'

```tsx
import { useMatch, NavLink } from 'react-router-dom'
// link
const Link = () => {
  return (<NavLink className={({ isPending, isActive }) => {
    return isActive ? 'active' : isPending ? 'pending' : ''
  }}/>)
}
// 如果组件配置异步loader, 在响应结果之前 isPending为 true


const Player = () => { // 页面路径为 /player
  const match = useMatch('/player')
  /**
   * 路径匹配的话 返回一个对象，返之返回 null
   * params:  {}
   * pathname: "/singer"
    pathnameBase: "/singer"
    pattern: {path: 'singer', caseSensitive: false, end: true}
  */
  return (
    <div>Player page</div>
  )
}

// Location State
/**
 * location.state just like location.hash or location.search except instead of putting the 
 * values in the URL it is hidden
*/
<Link to='/user' state={{ from: 'home' }}></Link>
<Link to='/user' reloadDocument={true}></Link> // reloadDocument 会刷新页面

// replace: The replace property can be used if you'd like to replace the current entry in the history stack
// preventScrollReset: let you prevent the scroll position from being reset to the top of the window

const navigate = useNavigate()
navigate('/user', { state: 'home' })

// 获取数据
import { useLocation } from 'react-router-dom'
const location = useLocation()
console.log(location.state)
```
## Data Loading

```tsx
const router = createBroweserRouter([
  {
    path: '/home',
    element: (<div>hello world</div>),
    loader: async () => {
      const res = await fetch('/api/v1/xxx')
      const list = res.json()
      return user
    }
  }
])
```

## Pending Navigation UI

```tsx
import { useNavigation } from 'react-router-dom'
const Root = () => {
  const navigation = useNavigation()
  return (
    <div>
      { navigation.state === 'pending' && <div>Loading...</div> }
    </div>
  )
}
```

## Outlets

```tsx
// 用来渲染嵌套路由
const App = () => {
  return (
    <div>
      <NavigationBar/>
      <Outlet/>
    </div>
  )
}
// The Outlet component will always render the next match.
```

## Route

  Routes are perhaps the most important part of React Router app.

  Routes are objects passed to the router creation functions:

```ts
const router = createBrowserRouter([
  {
    element: <Team/>,
    path: 'teams/:teamId',
    loader: async ({ request, params }) => {
      return fetch('/api/v1/xxx')
    },
    action: async ({ request }) => {
      return (//)
    },
    errorElement: <ErrorBoundary/>
  }
])
```

## Navigate

  A `Navigate` element changes the current location when it is rendered.
  it's a component wrapper around `useNavigate`.

```tsx
import { Navigate } from 'react-router-dom'

const User = () => {
  return (
    <div>
      {/* 页面会直接进行跳转 */}
      <Navigate to='/user'/>
    </div>
  )
}
```

## useNavigate

  The `useNavigate` hook returns a function that lets you navigate programmatically.

```tsx
const Home = () => {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/login', {
      replace: true,
      state: {
        {
          name: 'hello'
        }
      }
    })
  }
  return (
    <Button onClick={ handleLogin }>登录</Button>
  )
}
```

## useNavigation

  This hook tells you everything you need to know about a page navigation to build pending navigation indicators and
  optimistic UI on data mutations.

- navigation.state
- navigation.location
- navigation.formData
- navigation.text
- navigation.json

```ts
const Home = () => {
  const navigation = useNavigation()
  const text = 
    navigation.state === 'submitting'
      ? 'Saving...'
      : navigation.state === 'loading'
        ? 'saved'
        : 'Go'
  return (
    <div></div>
  )
}
```
## useOutletContext

  Ofen parent routes manage state or other values you want shared with child routes. You can create your own
  `context provider` if you like.

```tsx
const Parent = () => {
  const [count, setCount] = React.useState(0)
  return (
    <Outlet context={[count, setCount]}/>
  )
}

import { useOutletContext } from 'react-router-dom'
function Child () {
  const [count, setCount] = useOutletContext()
  const increment = () => {
    setCount(c => c + 1)
    return (
      <Button onClick={ increment }>{ count }</Button>
    )
  }
}
```