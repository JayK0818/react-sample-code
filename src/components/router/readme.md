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
])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
```

## Active Links

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