import React, { Component } from 'react'
import { withRouter } from 'react-router'
import RatingStar from '../../ratingStar/ratingStar'
import  './shopItem.css'
import { formatUrl } from '../../../api/config'

class ShopItem extends Component {
  constructor () {
    super ()
    this.state = {
      shopDetail: {},
      showActivities: false
    }
  }

  // 活动展示按钮
  actBtnClick = (e) => {
    // 阻止冒泡
    e.stopPropagation()
    this.setState({
      showActivities: !this.state.showActivities
    })
  }

  // 店铺跳转
  linkJump (data, e) {
    // window.location.href = `/shop/${ geoLocation.geohash }/${ data.id }`
    this.props.history.push({
      pathname: `/shop/${ data.id }`,
    })
  }

  render () {
    let shopInfo = this.props.shopDetail,
        shopImage = formatUrl(shopInfo.image_path, 'shop'),

        money_limit = shopInfo.piecewise_agent_fee.rules[0].price,
        computed_distance = shopInfo.distance / 1000 < 0 ? `${shopInfo.distance}m` : `${(shopInfo.distance / 1000).toFixed(2)}km`

    let tagList = shopInfo.support_tags.map((item, index) => {
      return (
        <span key={index} className="mini_tag" style={{ borderColor: item.border, color: item.color }}>{ item.text }</span>
      )
    }),
    activityArray = shopInfo.activities.concat(shopInfo.supports),
    activityList = activityArray.map((item, index) => {
      return (
        <div key={index} className="act_row" style={{ display: (index > 1 && !this.state.showActivities) ? 'none' : '' }}>
          <span className="act_icon_text" style={{ color: '#fff', backgroundColor: `#${item.icon_color}` }}>{ item.icon_name }</span>
          <span className="act_desc">{ item.description }</span>
        </div>
      )
    }),
    activityNum = activityArray.length

    return (
      <div>
        <section className="shop_item" onClick={ this.linkJump.bind(this, shopInfo) }>
          <div className="shop_info">
            <div className="logo_container">
              <div className="logo">
                <img src={ shopImage } alt={ shopInfo.name } />
              </div>
            </div>
            <div className="main_info">
              <section className="inner_line">
                <h3 className="shop_name">{ shopInfo.name }</h3>
              </section>
              <section className="inner_line">
                <div className="shop_rating">
                  <RatingStar rating={ shopInfo.rating } />
                  <span className="rating_score">{ shopInfo.rating }</span>
                  <span>月售{ shopInfo.recent_order_num }单</span>
                </div>
              </section>
              <section className="inner_line">
                <div className="money_limit">
                  <span>￥{ money_limit }起送</span>
                  <span>{ shopInfo.piecewise_agent_fee.tips }</span>
                </div>
                <div className="time_distance">
                  <span className="distance">{ computed_distance }</span>
                  <span>{ shopInfo.order_lead_time }分钟</span>
                </div>
              </section>
            </div>
          </div>
          <div className="shop_activitys">
            <section className="tag_line">{ tagList }</section>
            <section className="activities">
              <div className="activity_list">{ activityList }</div>
              <div className="activity_btn" onClick={ this.actBtnClick }>
                <span>{ activityNum }个活动</span>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjOTk5IiBkPSJNNC41NzcgNS40MjNjLjc5Ljc3IDIuMDczLjc2NyAyLjg1NyAwbDQuMTItNC4wMjZDMTIuMzQ1LjYyNSAxMi4wOSAwIDEwLjk4NSAwSDEuMDI3Qy0uMDc3IDAtLjMzLjYzLjQ1NyAxLjM5N2w0LjEyIDQuMDI2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+" alt="activity_btn" className={ this.state.showActivities ? 'activity_open' : '' } />
              </div>
            </section>
          </div>
          <div className="search-key_foodList" style={{ display: this.props.searchKeyFood ? '' : 'none' }}>
            {
              this.props.searchKeyFood ? this.props.searchKeyFood.map((item, key) => {
                if (key > 2) return null
                return (
                  <div className="search-key_foodItem" key={key}>
                    <img src={ formatUrl(item.image_path, 'searchFood') } alt={ item.name } />
                    <p className="item_name">{ item.name }</p>
                    <p className="item_price">￥{ item.price }</p>
                  </div>
                )
              }) : null
            }
          </div>
        </section>
      </div>
    ) 
  }
}

export default withRouter(ShopItem)
