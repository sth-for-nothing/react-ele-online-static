import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ShopList from '../../components/main/shopList'
import Loading from '../../components/loadingIcon/loading'
import { requestGetShopList } from '../../reducers/shopList'
import { setCurrentlocation } from '../../reducers/getAddress'

class ShopListSmart extends Component {
  static propTypes = {
    shopList: PropTypes.array,
    requestGetShopList: PropTypes.func,
    setCurrentlocation: PropTypes.func
  }

  constructor () {
    super ()
    this.state = {
      onpullData: false,
      noMoreData: false,
      shopListTitle: '推荐商家'
    }

    this.timer = true
  }

  componentDidMount () {
    this.props.requestGetShopList()
    this.props.setCurrentlocation()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.curSite && this.props.curSite.latitude !== nextProps.curSite.latitude && this.props.curSite.longitude !== nextProps.curSite.longitude) {
      this.props.requestGetShopList()
    }
  }

  render () {
    return (
      <div>
        <div className="shopListTitle">{ this.state.shopListTitle }</div>
        <ShopList data={ this.props.shopList } />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  shopList: state.shopList.list,
  curSite: state.getAddress.site,
  rank_id: state.shopList.rank_id
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  requestGetShopList,
  setCurrentlocation
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ShopListSmart)
