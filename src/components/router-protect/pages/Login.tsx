import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Button } from 'antd'
import { login, logout } from '@/store/login'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLogin = useAppSelector(state => state.isLogged)
  const handleLogin = () => {
    dispatch(login())
    navigate('/home')
  }
  return (
    <div>
      {
        isLogin ? <Button
          type={'primary'}
          size={'small'}
          onClick={() => dispatch(logout())}
        >退出登录</Button>
          : <Button type={'primary'} size={'small'} onClick={handleLogin}>用户登录</Button>
      }
    </div>
  )
}

export default Login