import React,{Component} from 'react'
import HeaderSmart from './header.js'
import Search from '../../components/main/search'
import SwipeSmart from "./swipe"
import ShopListSmart from './shopList'

class Main extends Component{

  render () {
    return (
      <div className="wrapper">
        <HeaderSmart />
        <Search />
        <SwipeSmart />
        <ShopListSmart />
      </div>
    )
  }
}

export default Main
