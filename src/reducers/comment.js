import axios from 'axios'
import { URL } from '../api/config'

const types = {
  REQUEST_COMMENTS_RATING_TAGS: 'REQUEST_COMMENTS_RATING_TAGS'
}

const initState = {
  comments: [],
  rating: {},
  tags: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.REQUEST_COMMENTS_RATING_TAGS:
      return {
        ...state,
        comments: action.data.comments,
        rating: action.data.rating,
        tags: action.data.tags
      }
    default:
      return state
  }
}

const successGetComments = (comments, rating, tags) => ({
  type: types.REQUEST_COMMENTS_RATING_TAGS,
  data: {
    comments,
    rating,
    tags
  }
})

export const requestComments = (shopId) => dispatch => {
  const url = URL.shopComments
  axios.get(url).then(res => {
    let { comments, rating, tags } = {...res.data}
    if (res.status === 200) dispatch(successGetComments(comments, rating, tags))
  }).catch(err => {
    console.log(err)
  })
}