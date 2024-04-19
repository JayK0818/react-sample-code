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
    <Form method='post'>
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
      return 'hello world'
      // return redirect(`/login`)
    }
/*     children: [
      {
        path: 'submit',
        element: <DataCollection/>
      }
    ] */
  }
])

const DataMutationApp = () => {
  return <RouterProvider router={router} />
}

export default DataMutationApp