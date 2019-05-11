import axios from 'axios'
import { URL } from '../api/config'
import { requestGetSiftFactors, requestGetCateIds } from '../api/getData'

const types = {
  SUCCESS_GET_FOODENTRY: 'SUCCESS_GET_FOODENTRY',
  SUCCESS_GET_CATELIST: 'SUCCESS_GET_CATELIST'
}

const initState = {
  foodEntries: [],
  cateList: []
}

// reducers
export default (state = initState, action) => {
  switch (action.type) {
    case types.SUCCESS_GET_FOODENTRY:
      return {
        ...state,
        status: 'success',
        foodEntries: [...action.data]
      }
    case types.SUCCESS_GET_CATELIST:
      return {
        ...state,
        cateList: action.data.cateList
      }
    default:
    return state
  }
}

// actions
const successGetFoodEntries = (entries) => ({
  type: types.SUCCESS_GET_FOODENTRY,
  data: entries
})
const getCateListAction = (cateList) => ({
  type: types.SUCCESS_GET_CATELIST,
  data: {
    cateList
  }
})

const requestGetFoodEntries = () => dispatch => {
  let location = JSON.parse(window.localStorage.getItem('LOCATION'))
  const url = URL.foodEntry
  return axios.get(url, {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      templates: [
        "main_template",
        "favourable_template",
        "svip_template"
      ]
    }
  }).then(res => {
    let foodEntries = res.data[0].entries
    if (foodEntries) dispatch(successGetFoodEntries(foodEntries))
  }).catch(err => {
    console.log(err.response)
  })
}

// 分类店铺
const requestGetCateRest = (entry_id, entry_name) => dispatch => {
  let cateList = [],
    url = URL.restaurants,
    location = JSON.parse(window.localStorage.getItem('LOCATION'))
  if (!location) return
  requestGetSiftFactors(entry_id).then(res => {
    if (cateList.length > 0) return
    cateList = res.length > 8 ? res.splice(0, 8) : res
    requestData()
  })
  requestGetCateIds(entry_name).then(res => {
    if (cateList.length > 0) return
    cateList = res
    requestData()
  })
 
  function requestData () {
    axios.get(url, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        keyword: '',
        offset: 0,
        limit: 8,
        extras: ['activities', 'tags'],
        terminal: 'h5',
        brand_ids: [],
        restaurant_category_ids: [...cateList]
      }
    }).then(res => {
      let data = res.data.items
      dispatch(getCateListAction(data))
    }).catch(err => {
      console.log(err)
    })
  }

}

export {
  requestGetFoodEntries,
  requestGetCateRest
}
