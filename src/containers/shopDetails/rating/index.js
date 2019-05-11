import React,{ Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RatingStar from '../../../components/ratingStar/ratingStar'
import CommentList from '../../../components/shopDetails/commentList/commentList'
import Loading from '../../../components/loadingIcon/loading'

import { requestComments } from '../../../reducers/comment'
import './index.css'

class RatingSmart extends Component{
  static propTypes = {
    comments: PropTypes.array,
    rating: PropTypes.object,
    tags: PropTypes.array,
    requestComments: PropTypes.func
  }

  constructor () {
    super ()
    this.state = {
      ratingViewHeight: '100%'
    }
  }

  async componentDidMount () {
    await this.props.requestComments(this.props.shopId)
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    let ratingViewHeight = clientHeight - this.props.tabHeight
    this.setState({
      ratingViewHeight
    })
  }

  render() {
    return(
      <div className="shop-rating_view" style={{ height: this.state.ratingViewHeight + 'px' }}>
        <section className="rating-score_view" style={{ display: Object.keys(this.props.rating).length > 0 ? '' : 'none' }}>
          <div className="score-total_left">
            <div className="total-score_txt">
              <p>{ Number(this.props.rating.food_score).toFixed(1) }</p>
            </div>
            <div className="total-score_star">
              <span>商家评分</span>
              <RatingStar rating={ Number(this.props.rating.food_score).toFixed(1) } />
            </div>
          </div>
          <div className="score-single_right">
            <div className="score-taste-packing_lf">
              <div>
                <span>味道</span>
                <p>{ Number(this.props.rating.taste_score).toFixed(1) }</p>
              </div>
              <div>
                <span>包装</span>
                <p>{ Number(this.props.rating.package_score).toFixed(1) }</p>
              </div>
            </div>
            <div className="score-delivery_rt">
              <span>配送</span>
              <p>{ Number(this.props.rating.rider_score).toFixed(1) }</p>
            </div>
          </div>
        </section>
        {
          Object.keys(this.props.rating).length === 0 || this.props.comments.length === 0 ? <Loading /> : <CommentList comments={ this.props.comments } tags={ this.props.tags } />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  comments: state.comment.comments,
  rating: state.comment.rating,
  tags: state.comment.tags
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  requestComments
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RatingSmart)
