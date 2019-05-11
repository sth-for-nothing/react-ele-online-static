import React,{ Component } from 'react'
import { connect } from 'react-redux'
import ShopList from '../../components/main/shopList'
import Header from '../../components/header'

class cateResultList extends Component {
  render () {
    return (
      <div>
        <Header title='' />
        <ShopList data={ this.props.cateList } />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  cateList: state.foodEntry.cateList
})

export default connect(mapStateToProps)(cateResultList)
