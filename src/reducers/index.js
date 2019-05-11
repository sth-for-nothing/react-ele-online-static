import { combineReducers } from 'redux'
import shopList from './shopList'
import foodEntry from './foodEntry'
import getAddress from './getAddress'
import shopCart from './shopCart'
import comment from './comment'
import login from './login'

export default combineReducers ({
  shopList,
  foodEntry,
  getAddress,
  shopCart,
  comment,
  login
})