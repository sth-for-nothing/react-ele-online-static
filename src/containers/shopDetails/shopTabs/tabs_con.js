import React from 'react'
import TabsLi from './tabLi'
import OrderingSmart from '../ordering'
import RatingSmart from '../rating'
import ShopInfo from '../shopInfo'

class TabsSmart extends React.Component {
  constructor () {
    super()
    this.state = {
      current: 0,
      flag: false
    }
  }

  clickTab (index) {
    this.setState({
      current: index
    })
  }

  recepSignal = (param) => {
    this.setState({
      flag: param
    })
  }

  getTabHeight = (height) => {
    this.setState({
      tabHeight: height
    })
  }

  render () {
    const tabList = [
      {
        title: '点餐',
        num: 0
      },
      {
        title: '评价',
        num: 1
      },
      {
        title: '店铺',
        num: 2
      }
    ]
    
    return (
      <TabsLi data={tabList} recepSignal={ this.recepSignal.bind(this) } getTabHeight={ this.getTabHeight.bind(this) }>
        <OrderingSmart key="0" menu={ this.props.menu } tabHeight={ this.state.flag ? this.state.tabHeight : '' } shopId={ this.props.shopId } />
        <RatingSmart key="1" shopId={ this.props.shopId } tabHeight={ this.state.tabHeight } />
        <ShopInfo key="2" restMessage={ this.props.restMessage } />
      </TabsLi>
    )
  }
}

export default TabsSmart