import React from 'react'

function mouseMove(WrappedComponent: any) {
  return class MouseMoveComponent extends React.Component {
    constructor(props: any) {
      super(props)
      this.state = {
        x: 0,
        y: 0
      }
    }
    listenMouseMove = (event: MouseEvent): void => {
      this.setState(state => ({
        x: event.clientX,
        y: event.clientY
      }))
    }
    componentDidMount() {
      document.addEventListener('mousemove', this.listenMouseMove, false)
    }
    componentWillUnmount() {
      document.removeEventListener('mousemove', this.listenMouseMove, false)
    }
    render() {
      return (
        <WrappedComponent {...this.state} />
      )
    }
  }
}

class MouseMove extends React.Component {
  constructor(props: any) {
    super(props)
  }
  render() {
    const { x, y } = this.props as { x: number, y: number }
    return <div>x: {x} - { y }</div>
  }
}

// render-props
class RenderPropsComponent extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      message: 'hello world'
    }
  }
  render() {
    return (
      <div>{ (this.props as any).render(this.state) }</div>
    )
  }
}
const App = () => {
  const JSX = mouseMove(MouseMove)
  return (
    <div>
      <JSX />
      <RenderPropsComponent
        // @ts-ignore
        render={(data: any) => {
        return (<div>{ data.message }</div>)
      }}></RenderPropsComponent>
    </div>
  )
}

export default App