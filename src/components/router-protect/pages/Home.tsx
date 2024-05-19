import React, { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/login'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    window.setTimeout(() => {
      dispatch(logout())
      // 修改isLogin 页面ui会修改, 但是路径没有更新
      navigate('/login')
    }, 5 * 1000)
  }, [])
  return (
    <div>我是首页</div>
  )
}

export default Home