import { createBrowserRouter, RouterProvider, NavLink } from 'react-router-dom'
import React, { useState } from 'react'

const Home = () => {
  const [count, setCount] = useState(1)
  return (
    <div>
      <p>首页</p>
      <NavLink to='/counter'>计数器</NavLink>
      <button onClick={() => setCount(count + 1)}>click me { count } times</button>
    </div>
  )
}

const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      Counter
      <NavLink to='/player'>Player</NavLink>
      <button onClick={() => setCount(count + 1)}>click me { count } times</button>
    </div>
  )
}

class Player extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      count: 0
    }
    console.log('constructor')
  }
  handleClick = (): void => {
    this.setState((state: any) => ({
      count: state.count + 1
    }))
  }
  componentDidMount() {
    console.log('component-did-mount')
  }
  componentDidUpdate() {
    console.log('component-did-update')
  }
  shouldComponentUpdate(props: any, state: any) {
    console.log(props, state)
    console.log('shoule-component-update')
    return true
  }
  render() {
    console.log('render')
    return (
      <div>
        <div>Class组件</div>
        <button onClick={this.handleClick}>click me { (this.state as any).count } times</button>
      </div>
    )
  }
}

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
    handle: {
      async middleware({ request }: any, context: any) {
        console.log('中间件', request, context)
      }
    }
  },
  {
    path: '/counter',
    element: <Counter/>
  },
  {
    path: '/player',
    element: <Player/>
  }
], {
  basename: '/react-app',
})

const App = () => {
  return (
    <div>
      <RouterProvider router={ router }></RouterProvider>
    </div>
  )
}

export default App