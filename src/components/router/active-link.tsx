import { RouterProvider, NavLink, createBrowserRouter, Outlet, useMatch } from 'react-router-dom'

const Player = () => {
  const match = useMatch('player')
  console.log('player-match:', match)
  return (
    <div>我是球员页面</div>
  )
}
const Singer = () => {
  const match = useMatch('singer')
  console.log('singer-match', match)
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
        element: <Singer />,
        loader: async () => {
          await new Promise(resolve => window.setTimeout(resolve, 10 * 1000))
          return 'hello world'
        }
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