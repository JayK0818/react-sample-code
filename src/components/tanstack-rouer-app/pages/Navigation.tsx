import React, { useId } from 'react'
import { Link } from '@tanstack/react-router'

const Navigation: React.FC = () => {
  const id = useId()
  return (
    <div>
      <Link to='/home' id={id}>首页</Link>
      <Link to='/user' id={id}>用户页面</Link>
    </div>
  )
}

export default Navigation