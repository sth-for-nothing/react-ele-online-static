// 读取 localStorage
const getCartFromStorage = () => {
  let data = window.localStorage.getItem('SHOP_CART')
  return data ? JSON.parse(data) : []
}

// set Storage
const setCartToStorage = (data) => window.localStorage.setItem('SHOP_CART', JSON.stringify(data))


const types = {
  UPDATE_SHOP_CART: 'UPDATE_SHOP_CART',
  ADD_CART: 'ADD_CART',
  REDUCE_CART_NUM: 'REDUCE_CART_NUM',
  CLEAR_CURRENT_CART: 'CLEAR_CURRENT_CART'
}

const initState = {
  cartList: getCartFromStorage(),
  curCartList: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_SHOP_CART:
      return {
        ...state,
        curCartList: action.data.shopId ? action.data.cart.filter(item => item.shopId === action.data.shopId) : action.data.cart
      }
    case types.ADD_CART:
      return {
        ...state,
        cartList: action.data.cart,
        curCartList: action.data.cart.filter(item => item.shopId === action.data.shopId)
      }
    case types.REDUCE_CART_NUM:
      return {
        ...state,
        cartList: action.data.cart,
        curCartList: action.data.cart.filter(item => item.shopId === action.data.shopId),
        status: action.data.status
      }
    case types.CLEAR_CURRENT_CART:
      return {
        ...state,
        cartList: action.data.cart,
        curCartList: []
      }
    default: 
      return state
  }
}

// actions
const updateShopCart = (shopId = null) => ({
  type: types.UPDATE_SHOP_CART,
  data: {
    cart: getCartFromStorage(),
    shopId
  }
})

const addCartAction = (cart, shopId) => ({
  type: types.ADD_CART,
  data: {
    cart,
    shopId
  }
})

const reduceCartAction = (cart, shopId, status) => ({
  type: types.REDUCE_CART_NUM,
  data: {
    cart,
    shopId,
    status
  }
})

const clearCurrentCartAction = (cart) => ({
  type: types.CLEAR_CURRENT_CART,
  data: {
    cart
  }
})

// 添加购物车
export const addShoppingCart = (shopId, foodItem) => dispatch => {
  const cartList = getCartFromStorage()
  let noSuchFood = true
  if (cartList.length > 0) {
    cartList.forEach((item, index) => {
      if(item.item_id === foodItem.item_id) {
        cartList[index].num++
        noSuchFood = false
      }
    })
    if (noSuchFood) {
      foodItem.num = 1
      foodItem.shopId = shopId
      cartList.push(foodItem)
    }
    setCartToStorage(cartList)
  } else {
    foodItem.num = 1
    foodItem.shopId = shopId
    cartList.push(foodItem)
    setCartToStorage(cartList)
  }
  dispatch(addCartAction(cartList, shopId))
}

// reduce cart 
export const reduceCartNum = (shopId, foodId) => dispatch => {
  let noSuchFood = true
  let cartList = getCartFromStorage()
  if (cartList.length > 0) {
    cartList.forEach((item, index) => {
      if (item.item_id === foodId) {
        cartList[index].num--
        noSuchFood = false
      }
      if (cartList[index].num === 0) cartList.splice(index, 1)
    })
    noSuchFood ? dispatch(reduceCartAction(cartList, shopId, 'failed')) : dispatch(reduceCartAction(cartList, shopId, 'success'))
    setCartToStorage(cartList)
  } else {
    dispatch(reduceCartAction(cartList, shopId, 'failed'))
  }
}

// 清空当前商店购物车
export const clearCurrentCart = (shopId) => dispatch => {
  let cartList = getCartFromStorage(), tempList = []
  if (cartList.length > 0) {
    tempList = cartList.filter((item) => item.shopId !== shopId)
  }
  dispatch(clearCurrentCartAction(tempList))
  setCartToStorage(tempList)
}

export {
  getCartFromStorage,
  setCartToStorage,
  updateShopCart
}
