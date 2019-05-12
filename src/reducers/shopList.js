import shopList from '../api/rsts'

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


// 发送获取商铺信息请求
const requestGetShopList = ()  => dispatch => {
  const list = shopList
  dispatch(successGetShopList(list))
}

export {
  requestGetShopList
}
