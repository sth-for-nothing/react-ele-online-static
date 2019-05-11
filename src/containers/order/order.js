import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { requestGetOrderList } from '../../api/getData'
import { formatUrl, timetrans } from '../../api/config'
import './order.css'

class Order extends Component {
  constructor () {
    super ()
    this.state = {
      orderList: [],
      noOrder: false,
      showSkeleton: false
    }
  }

  componentDidMount () {
    document.title = '订单'
    this.setState({
      showSkeleton: true
    })
    requestGetOrderList().then(data => {
      const orderList = data
      if (!orderList || orderList.length === 0) {
        this.setState({
          noOrder: true
        })
      }
      this.setState({
        orderList,
        showSkeleton: false
      })
    })
  }

    // 店铺跳转
  linkJump (id, e) {
    this.props.history.push({
      pathname: `/shop/${ id }`,
    })
  }

  render () {
    const orderList = this.state.orderList && this.state.orderList.length > 0 ? this.state.orderList : null
    return (
      <div>
        <header className="hd">订单</header>
        <div className="no_order" style={{ display: this.state.noOrder ? '' : 'none' }}>
        <svg t="1557480071107" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1106"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z" p-id="1107"></path></svg>暂时还没有订单</div>
        <ul style={{ display: this.state.showSkeleton ? '' : 'none' }}>
          {
            [1, 1, 1, 1].map((item, key) => 
              <img key={key} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3NTAgMzI1Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHdpZHRoPSI3NTAiIGhlaWdodD0iMzI1IiBmaWxsPSIjRkZGIiByeD0iNSIvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgeD0iMzAiIHk9IjI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIyIiB4PSIxMTAiIHk9IjcwIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iNDI3IiBoZWlnaHQ9IjI2IiB4PSIxMTAiIHk9IjE1MCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDUiIHJ4PSI0Ii8+PHBhdGggc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBkPSJNMTExLjUgMTI1aDYyME0zMC41IDIwNy41bDY5MyA3Ii8+PHJlY3Qgd2lkdGg9IjE0NiIgaGVpZ2h0PSI1MiIgeD0iNTg5IiB5PSIyNDYiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiByeD0iNCIvPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMjYiIHg9IjYxNSIgeT0iMTUwIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iMjEwIiBoZWlnaHQ9IjMyIiB4PSIxMTAiIHk9IjI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iOTAiIGhlaWdodD0iMjYiIHg9IjY0NSIgeT0iMzEiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiByeD0iNCIvPjwvZz48L3N2Zz4=" alt="" />
            )
          }
        </ul>
        <ul className="order-list_ul">
          {
            orderList ? orderList.map((item, key) => {
              // 要在循环内定义为块级变量，否则累加
              let totalPrice = 0
              return (
                <li className="order-card_item" key={key}>
                  <div className="order-item_body">
                    <div className="order-shop_logo">
                      <img src={ formatUrl(item.restImg, 'orderShop') } alt={item.restName} />
                    </div>
                    <div className="order-item_content">
                      <div className="order_head">
                        <div className="title">{item.restName}</div>
                        <p className="datetime">{timetrans(item.created_timestamp)}</p>
                      </div>
                      <div className="order_detail">
                          {
                            item.cartList.map((food, key) => {
                              totalPrice += Number(food.specfoods[0].price) * Number(food.num)

                              return(
                                <div className="food_item" key={key}>
                                  <img src={ formatUrl(food.image_path, 'orderFood') } alt={ food.name } />
                                  <span className="food_name">{ food.name }</span>
                                  <span className="food_num">x { food.num }</span>
                                  <span className="food_price"><span>￥</span>{ Number(food.specfoods[0].price) * Number(food.num) }</span>
                                </div>
                              )
                            })
                          }
                        <div className="totalPrice">合计 ￥{ totalPrice }</div>
                      </div>
                    </div>
                  </div>
                  <div className="order-item_bottom">
                    <button onClick={ this.linkJump.bind(this, item.restId) }>再来一单</button>
                  </div>
                </li>
              )
            }) : null
          }
        </ul>
      </div>
    )
  }
}

export default withRouter(Order)
