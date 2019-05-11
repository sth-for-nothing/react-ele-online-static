import React, { Component } from 'react'
import BackBtn from '../../../components/backButton'
import { formatUrl } from '../../../api/config.js' 

import './index.css'

class ShopHeader extends Component {
  
  render () {
    let shopInfo = this.props.headerInfo,
       shopBgImg = formatUrl(shopInfo.image_path, 'bg'),
      shopAvatar = formatUrl(shopInfo.image_path, 'avatar')
    
    return (
      <div className="header_wrapper">
        <div className="shop_msg">
          <div className="shop_bg_img" style={{ backgroundImage: `url(${shopBgImg})` }} >
            <BackBtn />
          </div>
          <div className="shop_info">
            <div className="shop_avatar">
              <img src={shopAvatar} alt={shopInfo.name} />
            </div>
            <div className="shop_related">
              <h2 className="shop_name">
                <span>{ shopInfo.name }</span>
              </h2>
              <div className="shop_other">
                <span className="eval">评价{shopInfo.rating}</span>
                <span className="month_sell">月售{shopInfo.recent_order_num}</span>
                <span className="delivery">{shopInfo.delivery_mode.text}约{shopInfo.order_lead_time}分钟</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShopHeader
