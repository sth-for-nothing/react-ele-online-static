import React,{ Component } from 'react'
import SideBar from './sidebar/sidebar'
import MenuList from './menuList/menuList'
import ShopCart from './shopCart/shopCart'
import './index.css'

class OrderingSmart extends Component{
  constructor () {
    super ()
    this.state = {
      activeId: null,
      selectMenu: false
    }
  }

  componentDidMount () {
    let clientHeight = window.document.documentElement.clientHeight
    this.setState({
      clientHeight,
    })
  }

  getCartHeight (height) {
    this.setState({
      cartHeight: height
    })
  }

  listChangeSite (id) {
    this.setState({
      activeId: id
    })
  }

  render() {
    let menuHeight = null
    if (this.props.tabHeight) {
      let tabHeight = this.props.tabHeight , cartHeight = this.state.cartHeight
      menuHeight = this.state.clientHeight - tabHeight - cartHeight
    } else {
      menuHeight = '100%'
    }
    return(
      <div className="ordering-menu_view slideCss" ref="orderRef">
        <div className="menu-view">
          <main className="menu-view_main" style={{ height: menuHeight }}>
            <SideBar menuCategory={ this.props.menu } activeId={ this.state.activeId } />
            <MenuList menuList={ this.props.menu } shopId={ this.props.shopId } listChangeSite={ this.listChangeSite.bind(this) } />
          </main>
          <ShopCart getCartHeight={ this.getCartHeight.bind(this) } shopId={ this.props.shopId } />
        </div>
      </div>
    )
  }
}

export default OrderingSmart
