import axios from 'axios'
import { URL } from '../api/config'

const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

const initState = {
  isLogin: false,
  username: null,
  phone: null,
  message: ''
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        ...action.data
      }
    case types.LOGOUT:
      return {
        ...state,
        ...initState
      }
    default: return state
  }
}

// actions
const loginAction = (data) => ({
  type: types.LOGIN,
  data
})

// 登录
export const requestLogin = (phone, password) => dispatch => {
  let username = Math.random().toString(16).substring(2)
  window.localStorage.setItem('USER', JSON.stringify({username, phone}))
  dispatch(loginAction({
    isLogin: true,
    username,
    phone,
    message: '登录成功'
  }))
}


