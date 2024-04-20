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
      <input value={username} onChange={handleUserNameChanged} type='text' placeholder='用户名' />
      <input type="text" value={password} onChange={handlePasswordChanged} placeholder='密码' />
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
    // Todo: 此功能未实现
    element: <FormComponent />,
    action: async ({ request }) => {
      console.log('request:', request.formData())
      await new Promise(resolve => setTimeout(resolve, 2000))
      // return 'hello world'
      return redirect('/')
      // return redirect(`/login`)
    },
    children: [
      {
        path: 'submit',
        element: <DataCollection />,
        errorElement: <div>Something went wrong!!!</div>,
        action: async ({ request }: any) => {
          console.log('request:', request)
          await new Promise(resolve => setTimeout(resolve, 2000))
          console.log('执行完了!!!')
          return redirect('/form')
        }
      }
    ]
  }
])

const DataMutationApp = () => {
  return <RouterProvider router={router} />
}

export default DataMutationApp