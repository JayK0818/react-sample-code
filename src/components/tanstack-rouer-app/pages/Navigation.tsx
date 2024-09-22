import React from 'react'
import { Link } from '@tanstack/react-router'

const Navigation: React.FC = () => {
  return (
    <div>
      <Link to='/home'>首页</Link>
      <Link to='/user'>用户页面</Link>
    </div>
  )
}

export default Navigation