import React from 'react'
// -------------------- 属性代理 ---------------------
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
// ----------------- 条件渲染 ----------------
function ConditionHighOrderComponent(WrappedComponent: any) {
  return (props: any) => props.visible ? <WrappedComponent {...props} /> : <div>暂无数据！！！！！！</div>
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

function VisibleComponent(props: any) {
  console.log('visible-component:', props)
  return <div>你可以看见我</div>
}

// -----------------反向继承----------------
const ReverseInherit = (WrappedComponent: any) => {
  return class ChildComponent extends WrappedComponent {
    constructor(props: any) {
      super(props)
    }
    componentDidMount() { // 覆盖了父组件的componentDidMount
      console.log('child-component-mounted')
    }
    render() {
      return super.render()
    }
  }
}
class ParentComponent extends React.Component {
  componentDidMount() {
    console.log('parent-component-mount')
  }
  render() {
    return <div>我是父组件12345</div>
  }
}
console.log(ParentComponent.prototype)

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
  const VisibleComponentJSX = ConditionHighOrderComponent(VisibleComponent)
  const InheritParentJSX = ReverseInherit(ParentComponent)
  console.log('hello', InheritParentJSX)
  return (
    <div>
      <JSX />
      <RenderPropsComponent
        // @ts-ignore
        render={(data: any) => {
        return (<div>{ data.message }</div>)
        }}></RenderPropsComponent>
      <VisibleComponentJSX visible={true} message={'hello world'} />
      <VisibleComponentJSX visible={false} />
        {/* @ts-ignore */}
      <InheritParentJSX/>
    </div>
  )
}

export default App