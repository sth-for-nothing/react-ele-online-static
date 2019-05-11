import React,{ Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addShoppingCart, reduceCartNum, updateShopCart, clearCurrentCart } from '../../../../reducers/shopCart'
import './shopCart.css'

class ShopCart extends Component{
  static propTypes = {
    cartList: PropTypes.array,
    updateShopCart: PropTypes.func,
    addShoppingCart: PropTypes.func,
    reduceCartNum: PropTypes.func,
    clearCurrentCart: PropTypes.func
  }

  constructor () {
    super ()
    this.state = {
      cartOpen: false,
      cartList: []
    }
  }

  componentDidMount () {
    let cartHeight = this.refs.cartRef.clientHeight || this.refs.cartRef.offsetHeight
    this.props.getCartHeight(cartHeight)
    this.props.updateShopCart(this.props.shopId)
  }

  componentWillReceiveProps (nextProp) {
    this.setState({
      cartList: nextProp.curCartList,
      cartOpen: nextProp.curCartList.length < 0 ? false : this.state.cartOpen
    })
  }

  clickMask = () => {
    this.setState({
      cartOpen: false
    })
  }

  showCart = () => {
    this.setState({
      cartOpen: this.state.cartList.length > 0 ? !this.state.cartOpen : false
    })
  }

  clearCart = () => {
    this.setState({
      cartOpen: false
    })
    this.props.clearCurrentCart(this.props.shopId)
  }

  toCheckoutPage () {
    this.props.history.push({
      pathname: `/checkout`,
      search: `?id=${this.props.shopId}`,
      state: this.props.curCartList
    })
  }

  render() {
    let totalPrice = 0, totalNum = 0

    const cartListDOM = this.state.cartList.map((item, index) => {
      // 总价
      totalPrice += Number(item.specfoods[0].price) * Number(item.num)
      totalNum += item.num

      return (
        <li className="entity_li" key={index}>
          <span className="entity-name_txt">
            <em>{ item.name }</em>
          </span>
          <span className="entity-total_price">
            <span className="price-descount_txt">{ Number(item.specfoods[0].price) * Number(item.num) }</span>
          </span>
          <span className="entity-btn_group">
            <span className="entity-btn_area">
              <a href="javascript:;" onClick={ this.props.reduceCartNum.bind(this, this.props.shopId, item.item_id) }>
                <svg viewBox="0 0 44 44" id="cart-add" width="100%" height="100%"><path fillRule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z" clipRule="evenodd"></path><path fillRule="evenodd" d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z" clipRule="evenodd"></path></svg>
              </a>
              <span className="entity-quantity_txt">{ item.num }</span>
              <a href="javascript:;" onClick={ this.props.addShoppingCart.bind(this, this.props.shopId, item) }>
                <svg viewBox="0 0 44 44" id="cart-minus" width="100%" height="100%"><path fill="none" d="M0 0h44v44H0z"></path><path fillRule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clipRule="evenodd"></path></svg>
              </a>
            </span>
          </span>
        </li>
      )
    })
    return(
      <div z-index="10">
        <footer className="shop-cart_view">
          <div className="cart-view_mask" style={{ zIndex: 10, display: this.state.cartOpen ? '' : 'none' }} onClick={ this.clickMask }></div>
          <div className={ `cart-body_view ${ this.state.cartOpen ? 'cart-view_open' : ''}`} style={{ zIndex: 11 }}>
            <div style={{ opacity: 1 }}>
              <div className="cart-view_header">
                <div className="cart-view_headTxt">
                  <span>已选商品</span>
                </div>
                <a href="javascript:;" className="clear-cart_btn" onClick={ this.clearCart }>
                  <svg xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 15" id="cart-remove" width="100%" height="100%"><g fill="none" fillRule="evenodd" transform="translate(1)"><path fill="#979797" d="M7.05 15h-5.5c-.303 0-.55-.26-.55-.583V5.091c0-.322.246-.583.55-.583.304 0 .55.26.55.583v8.743h4.95c1.032 0 2-.426 2.728-1.2A4.18 4.18 0 0 0 10.9 9.735l-.03-7.15c0-.323.245-.585.548-.586h.003c.302 0 .548.26.55.58L12 9.732a5.374 5.374 0 0 1-1.442 3.724C9.622 14.451 8.376 15 7.05 15z"></path><path fill="#979797" d="M12.458 3H.542C.242 3 0 2.776 0 2.5S.243 2 .542 2h11.916c.3 0 .542.224.542.5s-.243.5-.542.5"></path><path fill="#979797" d="M5 2h3V1H5v1zm3.464 1H4.536C4.24 3 4 2.776 4 2.5v-2c0-.276.24-.5.536-.5h3.928C8.76 0 9 .224 9 .5v2c0 .276-.24.5-.536.5z" mask="url(#cart-remove_b)"></path></g></svg>
                  <span>清空</span>
                </a>
              </div>
              <div className="cart-view_body">
                <ul className="entity-list_ul">
                  { cartListDOM }
                </ul>
              </div>
            </div>
          </div>
          <div className="cart-bottom_btns" style={{ zIndex: 11 }} ref="cartRef">
            <span className={ `cart-logo_btn ${this.state.cartList.length > 0 ? '' : 'cart-empty_img'} `} onClick={ this.showCart }>
              <span className="bagdes" style={{ display: this.state.cartList.length > 0 ? '' : 'none' }}>{ totalNum }</span>
            </span>
            <div className="cart_info" onClick={ this.showCart }>
              <p className={`cart-total_price ${ this.state.cartList.length > 0 ? '' : 'emptyCart' }`}>{ this.state.cartList.length > 0 ? `￥${totalPrice}` : '未选购商品' }</p>
            </div>
            <a href="javascript:;" className="submit-btn_area" onClick={ this.toCheckoutPage.bind(this) }>
              <span>去结算</span>
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cartList: state.shopCart.cartList,
  curCartList: state.shopCart.curCartList
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addShoppingCart,
  reduceCartNum,
  updateShopCart,
  clearCurrentCart
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShopCart))
