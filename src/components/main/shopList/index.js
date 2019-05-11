import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShopItem from './shopItem.js'
import './index.css'

class ShopList extends Component {
  static propTypes = {
    data: PropTypes.array
  }

  render () {
    let shopList = this.props.data
    let shopListHTML = shopList.map((item, index) => {
      return (
        <ShopItem shopDetail={ item.restaurant } searchKeyFood={ item.foods } key={ index } />
      )
    })

    return (
      <div>
        <section className="shopList">
          { shopListHTML }
        </section>
      </div>
    ) 
  }
}

export default ShopList