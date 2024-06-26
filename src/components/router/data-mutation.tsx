import { createBrowserRouter, RouterProvider, Form, redirect, useNavigation, Outlet } from 'react-router-dom'
import React, { useState } from 'react'
import type { ChangeEvent } from 'react'

const FormComponent = () => {
  // const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUserNameChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value)
  }
  const handlePasswordChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }
  // console.log(navigation)
  return (
    <Form method='post' action='submit'>
      {/* action 会向此路径提交一个请求, 在action函数中执行完成之后 然后通过redirect重定向 */}
      <input name='username' value={username} onChange={handleUserNameChanged} type='text' placeholder='用户名' />
      <input name='password' type="text" value={password} onChange={handlePasswordChanged} placeholder='密码' />
      <button type='submit'>提交</button>
      <Outlet/>
    </Form>
  )
}

const Login = () => {
  return (
    <div>
      <div>我是登录页面</div>
    </div>
  )
}

const DataCollection = () => {
  console.log('我会渲染吗???') // 此组件不会渲染
  return (
    <div>你好吗?</div>
  )
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/form',
    element: <FormComponent />,
    children: [
      {
        path: 'submit', // 对应 表单 对应的 action 路径
        element: <DataCollection />,
        errorElement: <div>Something went wrong!!!</div>,
        action: async ({ request }: any) => {
          console.log('request:', request)
          const data = await request.formData()
          console.log('username:', data.get('username'))
          console.log('password:', data.get('password'))
          await new Promise(resolve => setTimeout(resolve, 2000))
          console.log('执行完了!!!')
          return redirect('/login')
        }
      }
    ]
  }
])

const DataMutationApp = () => {
  return <RouterProvider router={router} />
}

export default DataMutationApp