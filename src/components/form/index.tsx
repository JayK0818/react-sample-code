import React, { useState, useEffect, ChangeEvent } from 'react'

const Form = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: ''
  })
  const handleUserChanged = (e: ChangeEvent<HTMLInputElement>, field: keyof typeof userInfo): void => {
    setUserInfo({
      ...userInfo,
      [field]: e?.target.value.trim()
    })
  }
  useEffect(() => {
    // 设置初始值
    // antd的 form 组件需要使用 hooks 设置每个字段的初始值
    setUserInfo({
      username: 'kyrie',
      password: 'hello'
    })
  }, [])
  return (
    <div>
      <form>
        <div>
          <span>用户名:</span>
          <input
            type="text"
            value={userInfo.username}
            onChange={(e) => handleUserChanged(e, 'username')}
          />
        </div>
        <div>
          <span>密码:</span>
          <input
            type="text"
            value={userInfo.password}
            onChange={(e) => handleUserChanged(e, 'password')}
          />
        </div>
      </form>
    </div>
  )
}

export default Form