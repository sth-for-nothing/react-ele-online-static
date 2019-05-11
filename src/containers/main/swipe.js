import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import Swipe from '../../components/main/swipe'
import SlideSkeleton from '../../components/skeleton/slideSkeleton'
import { requestGetFoodEntries, requestGetCateRest } from '../../reducers/foodEntry'
import { formatSwipeData } from '../../api/config'

class SwipeSmart extends Component {
  static propTypes = {
    foodEntries: PropTypes.array,
    requestGetFoodEntries: PropTypes.func,
    requestGetCateRest: PropTypes.func
  }

  constructor () {
    super()
      this.state = {
        data: []
      }
  }

  async componentDidMount () {
    await this.props.requestGetFoodEntries()
    let swipeList = formatSwipeData(this.props.foodEntries)
    this.setState({
      data: swipeList
    })
  }

  clickSwipeCate = (item) => {
    this.props.requestGetCateRest(item.id, item.name)
    this.props.history.push({
      pathname: `/cateResult`,
      search: `?target_name=${item.name}&entry_id=${item.id}`
    })
  }

  render () {
    return (
      <div>
        { this.state.data.length > 0 ? <Swipe data={ this.state.data } clickSwipeCate={ this.clickSwipeCate } /> : <SlideSkeleton /> }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  foodEntries: state.foodEntry.foodEntries
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  requestGetFoodEntries,
  requestGetCateRest
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SwipeSmart))