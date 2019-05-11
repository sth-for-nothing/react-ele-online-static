import React,{ Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addShoppingCart, reduceCartNum, updateShopCart } from '../../../../reducers/shopCart'
import { formatUrl, escapeID } from '../../../../api/config'
import './menuList.css'

class MenuList extends Component{
  static propTypes = {
    cartList: PropTypes.array,
    updateShopCart: PropTypes.func,
    addShoppingCart: PropTypes.func,
    reduceCartNum: PropTypes.func
  }

  componentDidMount () {
    let menuRef = this.refs.menuRef, scrTop = null, cateName = null, temp = null

    document.getElementById('scroller').addEventListener('scroll', () => {
      // 用于保存上一个值
      temp = cateName
      scrTop = menuRef.scrollTop
      menuRef.childNodes.forEach((item) => {
        if (item.offsetTop < scrTop + 10) {
          cateName = item.id
        }
      })
      if (cateName !== temp) this.props.listChangeSite(cateName)
    })

    this.props.updateShopCart()
  }

  getNum = (foodId) => {
    let cartList = this.props.cartList
    if (!cartList) return
    for (let i = 0, l = cartList.length; i < l; i++) {
      if (cartList[i].item_id === foodId) {
        return cartList[i].num
      }
    }
  }

  render() {

    const menuDL = this.props.menuList.map((item, index) => {
      return (
        <dl className="menu" key={index} id={escapeID(item.name)}>
          <dt className="menu-head_dt">
          <div className="menu-cate_title">
            <strong className="menu-cate_name">{ item.name }</strong>
            <span className="menu-cate_desc">{ item.description }</span>
          </div>
          </dt>

          { item.foods.map((food, i) => {
            return (
              <dd className="menu-item_dd" key={i}>
                <div className="food-detail_root">
                  <span className="food-detail_logo">
                    <img src={ formatUrl(food.image_path, 'food') } alt={food.name} />
                  </span>
                  <section className="food-detail_info">
                    <p className="food_name_txt">{ food.name }</p>
                    <p className="food-desc_txt">{ food.description }</p>
                    <p className="food-sales_box">
                      <span>月售{ food.month_sales }份</span>
                      <span>好评率{ food.satisfy_rate }%</span>
                    </p>
                    <span className="sale_price">￥{ food.specfoods[0].price }</span>
                    <div className="food-select_box">
                      <span className="food-select_btn">
                        <a href="javascript:;" className="food-reduce_btn" style={{ display: this.getNum(food.item_id) ? '' : 'none' }} onClick={ this.props.reduceCartNum.bind(this, this.props.shopId,food.item_id) }>
                          <svg style={{ fill: 'rgb(35, 149, 255)' }} viewBox="0 0 44 44" id="cart-add" width="100%" height="100%"><path fillRule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z" clipRule="evenodd"></path><path fillRule="evenodd" d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z" clipRule="evenodd"></path></svg>
                        </a>
                        <span className="food-num_txt">
                        { this.getNum(food.item_id) } 
                        </span>
                        <a href="javascript:;" className="food-add_btn" onClick={ this.props.addShoppingCart.bind(this, this.props.shopId, food) }>
                          <svg style={{ fill: 'rgb(35, 149, 255)' }} viewBox="0 0 44 44" id="cart-minus" width="100%" height="100%"><path fill="none" d="M0 0h44v44H0z"></path><path fillRule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clipRule="evenodd"></path></svg>
                        </a>
                      </span>
                    </div>
                  </section>
                </div>
              </dd>
            )
          }) }

        </dl>
      )
    })

    return(
      <section className="menuList container" id="menuList">
        <div className="scroller" ref="menuRef" id="scroller">
          { menuDL }
        </div>
      </section>
    )
  }
}
const mapStateToProps = (state) => ({
  cartList: state.shopCart.cartList
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addShoppingCart,
  reduceCartNum,
  updateShopCart
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(MenuList)
