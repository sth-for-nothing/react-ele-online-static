import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Main from  './main/main.js'
import Order from  './order/order.js'
import My from  './my/my.js'

import Footer from '../components/footer'
import Login from '../components/login/login'

import ShopDetails from './shopDetails/shopDetails'
import Search from './search/search'
import CateResultList from './cateResultList/cateResultList'
import CheckoutOrder from './checkoutOrder/checkoutOrder'
import MyAddress from './myAddress/myAddress'

import { setCookie } from '../api/setCookie'

class App extends Component {

  componentWillMount () {
    document.title = '外卖订餐'
    setCookie()
  }

  render() {

    const Shop = ({ match }) => <ShopDetails id={ match.params.id } />
    const Checkout = ({ location }) => <CheckoutOrder cartList={ location.state } />

    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Main} />
          <Route path='/order' component={Order} />
          <Route path='/my' component={My} />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/shop/:id' component={Shop} />
            <Route path='/search' component={Search} />
            <Route path='/cateResult' component={CateResultList} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/address" component={MyAddress} />
            <Footer />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
