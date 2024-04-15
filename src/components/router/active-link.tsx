import { RouterProvider, NavLink, createBrowserRouter, Outlet } from 'react-router-dom'

const Player = () => {
  return (
    <div>我是球员页面</div>
  )
}
const Singer = () => {
  return (
    <div>我是歌手页面</div>
  )
}

const navList = [
  {
    id: 1,
    url: '/player',
    text: '球员页面'
  },
  {
    id: 2,
    url: '/singer',
    text: '歌手页面'
  }
]

const Navigation = () => {
  return (
    <>
      {
        navList.map(nav => (
          <NavLink
            to={nav.url}
            key={nav.id}
            style={({ isActive }) => {
              return {
                color: isActive ? 'red' : 'black'
              }
            }}
            className={({ isActive, isPending }) => {
              return isActive ? "active-link" : isPending ? "pending" : ""
            }}
          >{nav.text}</NavLink>
        ))
      }
      <Outlet/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    children: [
      {
        path: 'player',
        element: <Player/>
      },
      {
        path: 'singer',
        element: <Singer/>
      }
    ]
  }
])

const ActiveLinkApp = () => {
  return (
    <RouterProvider router={ router } />
  )
}

export default ActiveLinkApp