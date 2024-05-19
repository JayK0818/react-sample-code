import { Outlet, redirect } from 'react-router-dom'
import React from 'react'
import { useAppSelector } from '@/store/hooks'
import Login from '../pages/Login'

const AuthRoute = () => {
  const isLogged = useAppSelector(state => state.isLogged)
  if (isLogged) {
    return <Outlet/>
  }
  return <Login/>
}

export default AuthRoute