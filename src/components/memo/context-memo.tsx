import React, { useContext, memo, useState, createContext } from 'react'
import { Button } from 'antd'

// -------------- 使用了context的 memo包裹的组件 会重新渲染 -----------

const ThemeContext = createContext('light')

// 不会被重新渲染
const Greeting = memo(({ name }: { name: string }) => {
  console.log('greeting执行了吗', name)
  return (
    <h4>Hello, { name }</h4>
  )
})

// ---------------- 因为使用了 context, 所有每次更新父组件, 此组件也会更新 -----------------
const MemoContextGreeting = memo(({ name }: { name: string }) => {
  console.log('memo-greeting执行了吗', name)
  const theme = useContext(ThemeContext)
  return (
    <h4>Hello, {name} --- { theme }</h4>
  )
})

const App: React.FC = () => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <ThemeContext.Provider value={theme}>
      <Button
        type={'primary'}
        size={'small'}
        onClick={toggleTheme}
      >toggle theme {theme}</Button>
      <Greeting name={'kyrie'} />
      <MemoContextGreeting name={ 'durant' } />
    </ThemeContext.Provider>
  )
}

export default App