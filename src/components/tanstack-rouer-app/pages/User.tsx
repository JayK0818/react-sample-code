import React from 'react'
import { Outlet } from '@tanstack/react-router'

const User: React.FC = () => {
  return (
    <div>
      Hello This is User Page!!!!
      <Outlet/>
    </div>
  )
}

export default User