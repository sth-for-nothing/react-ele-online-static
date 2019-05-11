import axios from 'axios'
import { URL } from '../api/config'

const types = {
  GET_CURRENT_ADDRESS: 'GET_CURRENT_ADDRESS',
  SET_CURRENT_CITY: 'SET_CURRENT_CITY',
  GET_SEARCH_RESULT_LIST: 'GET_SEARCH_RESULT_LIST'
}

const initState = {
  currentCity: null,
  curAddress: null,
  searchResultList: [],
  site: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.GET_CURRENT_ADDRESS:
      return {
        ...state,
        currentCity: action.data.city,
        curAddress: action.data.address,
        site: action.data.site
      }
    case types.SET_CURRENT_CITY:
      return {
        ...state,
        currentCity: action.data.city
      }
    case types.GET_SEARCH_RESULT_LIST:
      return {
        ...state,
        searchResultList: action.data.list
      }
    default: 
      return state
  }
}

// actions
const getCurAddressAction = (site, curCity = null) => ({
  type: types.GET_CURRENT_ADDRESS,
  data: {
    city: curCity || site.city,
    address: site.name,
    site
  }
})

const setCurCityAction = (city) => ({
  type: types.SET_CURRENT_CITY,
  data: {
    city
  }
})

const getSearchResultListAction = (list) => ({
  type: types.GET_SEARCH_RESULT_LIST,
  data: {
    list
  }
})


// 从 storage 读取 citylist
const getCityList = () => {
  let list = JSON.parse(window.localStorage.getItem("CITY_LIST"))
  if (!list) {
    const url = URL.cityList
    axios.get(url).then(res => {
      list = res.data
      window.localStorage.setItem('CITY_LIST', JSON.stringify(list))
    }).catch(err => {
      console.log(err)
    })
  }
  return list || null
}
// 当前地址
const getCurCityLocation = () => {
  let location = JSON.parse(window.localStorage.getItem('LOCATION'))
  return location || null
}
const setCurCityLocation = (site) => {
  window.localStorage.setItem('LOCATION', JSON.stringify(site))
}

// session
const setCurCityIntoSession = (city) => {
  window.sessionStorage.setItem('LOCATION', JSON.stringify(city))
}
const getCurCityFromSession = () => {
  return JSON.parse(window.sessionStorage.getItem('LOCATION'))
}

// 设置当前地址和城市 state
export const setCurrentlocation = () => dispatch => {
  getCityList()
  let sessionCity = getCurCityFromSession(),
     curLocation = getCurCityLocation()
  
  let curCity = sessionCity ? sessionCity.city : null
  if (curLocation) dispatch(getCurAddressAction(curLocation, curCity))
}

export const setCurrentCity = (city) => dispatch => {
  let currentCity = city.name
  dispatch(setCurCityAction(currentCity))
  setCurCityIntoSession(city)
}

// 查询 keyword 相关地址
export const requestSearchLocation = (keyword) => dispatch => {
  if (!keyword) return

  const sessionCity = getCurCityFromSession()
  let { latitude, longitude } = sessionCity ? sessionCity : {latitude: null, longitude: null}
  const url = URL.addressSearch
  axios.get(url, {
    params: {
      keyword,
      offset: 0,
      limit: 20,
      latitude,
      longitude
    }
  }).then(res => {
    dispatch(getSearchResultListAction(res.data))
  }).catch(err => {
    console.log(err)
  })
}

// 点击选择地址
export const setCurrentAddress = (site) => dispatch => {
  dispatch(getCurAddressAction(site))
  dispatch(getSearchResultListAction([]))
  setCurCityLocation(site)
  setCurCityIntoSession(site)
}

export {
  getCityList,
  getCurCityLocation,
  getCurCityFromSession
}
