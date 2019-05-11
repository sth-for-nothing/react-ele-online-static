import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import GetAddress from '../../../containers/getAddress/getAddress'
import { getCurCityFromSession } from '../../../reducers/getAddress'

import './header.css'

class Header extends Component {
  constructor () {
    super ()
    this.state = {
      getAddress: false,
      address: ''
    }
  }

  componentWillMount () {
    window.history.pushState({
      page: 'home'
    }, '', '')

    window.addEventListener('popstate', this._isCurrent)

    const location = getCurCityFromSession()
    if (!location) {
      let timer = null
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        this.setState({
          getAddress: true
        })
      }, 1000)
    }
    this.setState({
      address: location ? location.name : null
    })
  }

  handleClick () {
    this.setState({
      getAddress: true
    })
    this._addHistory()
    this._bodyoverflow()
  }

  // 添加历史记录
  _addHistory () {
    window.history.pushState({
      page: 'getAddress',
    }, '', '')
  }

  // 通过 history 判断
  _isCurrent = () => {
    if (!window.history.state) return
    if (window.history.state.page === 'getAddress') {
      this.setState({
        getAddress: true
      })
      this._bodyoverflow()
    } else if (window.history.state.page === 'home') {
      this.setState({
        getAddress: false
      })
      window.document.body.style.overflow = 'auto'
    }
  }

  _bodyoverflow () {
    window.document.body.style.overflow = 'hidden'
  }

  componentWillUnmount () {
    window.removeEventListener('popstate', this._isCurrent)
  }

  confirmAddress = (site) => {
    this.setState({
      address: site,
      getAddress: false
    })
    window.history.go(-1)
  }

  render () {
    return (
      <ReactCSSTransitionGroup transitionName='example'	transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        <header className='main_header'>
          <div className="hd_title">
            <div className="main_address" onClick={ this.handleClick.bind(this) }>
              <span className="address_icon"></span>
              <span className="address">
                { this.state.address ? this.state.address : '正在获取地址...'}
              </span>
              <i className="sj"></i>
            </div>
          </div>
        </header>
        { this.state.getAddress ? <GetAddress confirmAddress={ this.confirmAddress } /> : null }
      </ReactCSSTransitionGroup>
    )
  }
}

export default Header
