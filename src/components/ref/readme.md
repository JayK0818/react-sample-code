# Ref

  当你 希望组件 '记住' 某些信息, 但又不想让这些信息 触发新的渲染, 可以使用ref

```ts
import { useRef } from 'react'

function Counter () {
  const countRef = useRef(0)
  useEffect(() => {
    countRef.current = 1
  }, [])
}
```
  ref时一个普通的JavaScript对象, 具有可以被读取和修改的 **current** 属性。 组件不会在每次递增时重新渲染, 与state一样, React会在每次
  重新渲染之前保留ref. 设置state会重新渲染组件, 但是更改 ref 不会。

1. 存储 **timeout ID**
2. 存储和操作 **DOM 元素**
3. 存储不需要被用来计算JSX的其他对象