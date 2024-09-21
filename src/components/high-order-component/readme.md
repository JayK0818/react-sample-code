# HOC(高阶组件)

## 属性代理

```tsx
function WrapComponent (Component) {
  const newProps = {}
  return props => <Component {...newProps, ...props}/>
}
```