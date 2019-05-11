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

const logoutAction = () => ({
  type: types.LOGOUT,
})

// 登录
export const requestLogin = (phone, password) => dispatch => {
  const url = URL.root
  axios.post(`${url}/login`, {
    phone,
    password
  }).then(res => {
    const message = res.data.message
    if (message === 'login' || message === 'signUp') {
      dispatch(
        loginAction({
          isLogin: true,
          username: res.data.user.username,
          phone,
          message: '登录成功'
        })
      )
      delete res.data.user.password
      window.localStorage.setItem('USER', JSON.stringify(res.data.user))
    } else if (message === 'pwdWrong') {
      dispatch(
        loginAction({
          isLogin: false,
          message: '密码错误'
        })
      )
    }
  }).catch(err => {
    console.log(err)
  })
}


