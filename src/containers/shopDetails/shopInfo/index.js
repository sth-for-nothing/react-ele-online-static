import React,{ Component } from 'react'
import { formatUrl } from '../../../api/config'
import './index.css'

class ShopInfo extends Component{
  constructor () {
    super()
    this.state = {
      increaseImg: false,
      index: 0
    }
  }
  handleClickAlbum (index) {
    this.setState({
      increaseImg: !this.state.increaseImg,
      index
    })
  }

  render() {
    let restMessage = this.props.restMessage,
     distance = restMessage.distance / 1000 > 0 ? Number(restMessage.distance / 1000).toFixed(1) + 'km' : restMessage.distance + 'm'

    return(
      <div className="inner-shop_info">
        <section className="section delivery_msg">
          <h3 className="section_title">配送信息</h3>
          <div className="msg_detail">
            <span>由{ restMessage.delivery_mode.text }提供配送，</span>
            <span>约{ restMessage.order_lead_time }分钟到达</span>
            <span>距离{ distance }</span>
            <div>配送费￥{ restMessage.float_delivery_fee }</div>
          </div>
        </section>

        <section className="section shop-albums_section" style={{ display: restMessage.albums ? '' : 'none' }}>
          <h3 className="section_title">商家实景</h3>
          <div className="albums">
            { restMessage.albums ? restMessage.albums.map((item, index) => {
              return (
                <a href="javascript:void(0)" key={index}  className={`${ this.state.increaseImg && this.state.index === index ? 'maxImg' : '' }`} onClick={ this.handleClickAlbum.bind(this, index) }>
                  <img src={ formatUrl(item.cover_image_hash, 'shopAlbum') } alt={ item.name }/>
                  <span>{ item.name }({ item.count })张</span>
                </a>
              )
            }) : null }
          </div>
        </section>

        <section className="section shop-Info_section">
          <h3 className="section_title">商家信息</h3>
          <ul className="shop-info_detail">
            <li>{ restMessage.description }</li>
            <li>
              <span>品类</span>
              <span>{ restMessage.flavors[0].name }</span>
            </li>
            <li>
              <span>商家电话</span>
              <span>{ restMessage.phone }</span>
            </li>
            <li>
              <span>地址</span>
              <span>{ restMessage.address }</span>
            </li>
            <li>
              <span>营业时间</span>
              <span>{ restMessage.opening_hours[0].replace('/', ' - ') }</span>
            </li>
          </ul>
        </section>
      </div>
    )
  }
}

export default ShopInfo
