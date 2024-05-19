import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: false,
  reducers: {
    login: () => {
      console.log('执行登录了吗')
      return true;
    },
    logout: () => {
      console.log('执行退出登录了吗')
      return false
    }
  }
})

export const { login, logout } = loginSlice.actions

export default loginSlice;