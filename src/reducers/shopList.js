import { requestRestList } from '../api/getData'
import { getCurCityLocation } from './getAddress'

const types = {
  SUCCESS_GET_SHOP_LIST: 'SUCCESS_GET_SHOP_LIST',
  FAILURE_GET_SHOP__LIST: 'FAILURE_GET_SHOP__LIST',
}

const initState = {
  list: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.SUCCESS_GET_SHOP_LIST:
      return {
        ...state,
        status: 'success',
        list: action.data.list
      }
    case types.FAILURE_GET_SHOP__LIST:
      return {
        ...state,
        status: 'failure'
      }
    default:
      return state
  }
}

// actions
const successGetShopList = (list) => ({
  type: types.SUCCESS_GET_SHOP_LIST,
  data: {
    list
  }
})

const failureGetShopList = () => ({
  type: types.FAILURE_GET_SHOP__LIST
})

// localStorage
const setRestaurantsIntoStorge = (data) => {
  window.localStorage.setItem('SHOP_LIST', JSON.stringify(data))
}
const getRestaurantsFromStorage = () => {
  let restList = window.localStorage.getItem('SHOP_LIST')
  return restList ? JSON.parse(restList) : null
}

// 发送获取商铺信息请求
const requestGetShopList = ()  => dispatch => {
  const location = getCurCityLocation()
  // 未定位
  if (!location) {
    dispatch(failureGetShopList())
    return
  }

  requestRestList().then(list => {
    if (list) {
      setRestaurantsIntoStorge(list)
      dispatch(successGetShopList(list))
    }
  }).catch(err => {
    console.log(err)
    dispatch(failureGetShopList())
    const restList = getRestaurantsFromStorage()
    dispatch(successGetShopList(restList))
  })
}

export {
  requestGetShopList
}
