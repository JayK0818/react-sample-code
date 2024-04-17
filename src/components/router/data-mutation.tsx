import { createBrowserRouter, RouterProvider, Form, redirect, useNavigation } from 'react-router-dom'
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
    <Form action='/login'>
      <input value={username} onChange={handleUserNameChanged} type='text' placeholder='用户名' />
      <input type="text" value={password} onChange={handlePasswordChanged} placeholder='密码' />
      <button type='submit'>提交</button>
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
      await new Promise(resolve => setTimeout(resolve, 2000))
      const data = await request.formData()
      return redirect(`/login?data=${JSON.stringify(data)}`)
    }
  }
])

const DataMutationApp = () => {
  return <RouterProvider router={router} />
}

export default DataMutationApp