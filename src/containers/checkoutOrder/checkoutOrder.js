import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Header from '../../components/header'
import { requestGetReceiveAddress } from '../../api/getData'
import { formatUrl } from '../../api/config'
import './checkoutOrder.css'

import { clearCurrentCart } from '../../reducers/shopCart'

class CheckoutOrder extends Component {
  constructor () {
    super ()
    this.state = {
      receiveAddr: {},
      shopName: '',
      pay: false
    }
  }

  componentDidMount () {
    document.title = '确认订单'
    requestGetReceiveAddress().then(address => {
      if (address && address.length > 0) {
        this.setState({
          receiveAddr: address[0],
        })
      }
    })
    
    const shopDetail = JSON.parse(localStorage.getItem('RESTAURANT_DATA'))
    this.setState({
      shopDetail,
      shopName: shopDetail.rst.name,
      title: '确认订单'
    })
  }

  payfor = () => {
    this.setState({
      title: '正在支付'
    })
    const addr = JSON.parse(window.localStorage.getItem('RECEIVE_ADDRESS'))
    if (!addr) {
      alert('未填写收货地址')
      return
    }
    if (this.timer)
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({
        pay: true
      })
    }, 500)
    this.saveOrder()
    this.timer = setTimeout(() => {
      this.props.history.push({
        pathname: '/order'
      })
    }, 1500)
  }

  saveOrder = () => {
    let shopDetail = this.state.shopDetail.rst
    let restId = shopDetail.id,
      restName = this.state.shopName,
      restImg = shopDetail.image_path,
      cartList = this.props.cartList,
      created_timestamp = Date.parse(new Date())
    let orderList = JSON.parse(window.localStorage.getItem('ORDER_LIST')) || []
    orderList.push({restId, restName, restImg, cartList, created_timestamp})

    window.localStorage.setItem('ORDER_LIST', JSON.stringify(orderList))

    this.props.clearCurrentCart(restId)
  }

  addAddr () {
    this.props.history.replace({
      pathname: '/address'
    })
  }

  render () {
    let receiveAddr = this.state.receiveAddr,
     totalPrice = 0

    const cartLi = this.props.cartList.map((item, index) => {
      // 总价
      totalPrice += Number(item.specfoods[0].price) * Number(item.num)

      return (
        <li className="entity_li" key={index}>
          <img src={ formatUrl(item.image_path, 'orderFood') } alt={ item.name } />
          <span className="food_name">{ item.name }</span>
          <span className="food_num">x { item.num }</span>
          <span className="food_price"><span>￥</span>{ Number(item.specfoods[0].price) * Number(item.num) }</span>
        </li>
      )
    })

    return (
      <div className="checkoutPage">
        <Header title={ this.state.title } />
        <div className="checkout_main viewbody">
          <section className="receiveAddr addr_block">
            <p className="title">
              {
                receiveAddr.address ? <span>订单配送至</span> : <span style={{ fontSize: '28px' }} onClick={ this.addAddr.bind(this) }>添加收货地址</span>
              }
              
            </p>
            <p className="addr_detail">
              <span>{ receiveAddr.address }</span>
            </p>
            <h2 className="addr_name">
              <span className="user_name">{ receiveAddr.name }</span>
              <span className="user_sex">{ receiveAddr.sex === 1 ? '(先生)' : receiveAddr.sex === 2 ? '(女士)' : '' }</span>
              <span className="phone">{ receiveAddr.phone }</span>
            </h2>
          </section>
          <section className="cart-group_block">
            <h3 className="shop_name">{ this.state.shopName }</h3>
            <ul className="cart-list_ul">
              { cartLi }
            </ul>
            <div className="cale_price">小计 ￥
              <span>{ totalPrice }</span>
            </div>
          </section>
        </div>
        <footer>
          <span>￥{ totalPrice }</span>
          <button onClick={ this.payfor }>确认支付</button>
        </footer>
        <div className="mask" style={{ display: this.state.pay ? '' : 'none' }}></div>
        <div className="pay-success_box" style={{ display: this.state.pay ? '' : 'none' }}>
          <svg t="1557496974655" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#52C41A"></path><path d="M178.614857 557.860571a42.496 42.496 0 0 1 60.123429-60.050285l85.942857 87.625143a42.496 42.496 0 0 1-60.050286 60.123428L178.614857 557.860571z m561.005714-250.148571a42.496 42.496 0 1 1 65.097143 54.637714L394.459429 725.577143a42.496 42.496 0 0 1-65.097143-54.637714l410.112-363.373715z" fill="#FFFFFF"></path></svg>
          <span>支付成功</span>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  clearCurrentCart
}, dispatch)

export default connect(null, mapDispatchToProps)(withRouter(CheckoutOrder))
