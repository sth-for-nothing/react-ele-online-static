import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Header from '../../components/header'
import CityList from './cityList'

import { setCurrentlocation, setCurrentCity, requestSearchLocation, setCurrentAddress } from '../../reducers/getAddress'
import { requestGetReceiveAddress } from '../../api/getData'
import './getAddress.css'

class  getAddress extends Component {
  static proptype = {
    currentCity: PropTypes.array,
    curAddress: PropTypes.string,
    setCurrentlocation: PropTypes.func,
    setCurrentCity: PropTypes.func,
    requestSearchLocation: PropTypes.func,
    setCurrentAddress: PropTypes.func
  }

  constructor () {
    super ()
    this.state = {
      rotate: false,
      addressList: [],
      showCityList: false
    }
  }

  componentDidMount () {
    document.title = '选择地址'
    this.props.setCurrentlocation()
    requestGetReceiveAddress().then(res => {
      this.setState({
        addressList: res
      })
    })
    window.addEventListener('popstate', this._isCurrent)
  }

  componentWillUnmount () {
    window.removeEventListener('popstate', this._isCurrent)
  }

  getLocation = () => {
    if (this.getLocation.timer) clearTimeout(this.timer)
    this.setState({
      rotate: true
    })
    this.getLocation.timer = setTimeout(() => {
      this.setState({
        rotate: false
      })
    }, 1000)
  }

  onChangeSite = (event) => {
    let keywords = event.target.value
    this.props.requestSearchLocation(keywords)
    if (!keywords) {
      this.setState({
        showCityList: false
      })
    }
  }

  handleClickCityChoose = () => {
    this.setState({
      showCityList: true
    })
    this._addHistory()
  }

  // 添加历史记录
  _addHistory() {
    window.history.pushState({
      page: 'cityList',
    }, '', '')
  }

  // 通过 history 判断
  _isCurrent = () => {
    if (!window.history.state) return
    if (window.history.state.page === 'cityList') {
      this.setState({
        showCityList: true
      })
    } else if (window.history.state.page === 'getAddress') {
      this.setState({
        showCityList: false
      })
    } else if (window.history.state.page === 'home') {
      window.document.body.style.overflow = 'auto'
    }
  }

  chooseCity = (city) => {
    this.props.setCurrentCity(city)
    this.setState({
      showCityList: false
    })
  }

  setCurrentAddress (item) {
    this.props.setCurrentAddress(item)
    this.props.confirmAddress(item.name)
    this.refs.searchSiteRef.value = ''
  }

  // 修改地址
  modifySite (user) {
    this.props.history.push('/address', {
      user
    })
  }

  render () {
    const showSearchResult = this.props.searchResultList.length > 0 ? '' : 'none'
    const hiddenSearchResult = this.props.searchResultList.length > 0 ? 'none' : ''
    return (
      <div className="getAdderss">
        <div style={{ display: this.state.showCityList ? 'none' : '', height: '100%', overflowY: 'auto' }}>
          <Header title="选择收货地址" />
          <form className="search_address_form">
            <div className="city_click" onClick={ this.handleClickCityChoose }>
              <span>{ this.props.currentCity || '选择城市' }</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8" className="index-2KCWC_0"><path fill="#333" fillRule="evenodd" d="M5.588 6.588c.78.78 2.04.784 2.824 0l5.176-5.176c.78-.78.517-1.412-.582-1.412H.994C-.107 0-.372.628.412 1.412l5.176 5.176z"></path></svg>
            </div>
            <div className="city_input">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="search_icon"><path fillOpacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
              <input type="search" placeholder="请输入地址" autoFocus ref="searchSiteRef" className="search_adderss_input" onChange={ this.onChangeSite } />
            </div>
          </form>
          <section className="addr_list" style={{ display: showSearchResult }}>
            { this.props.searchResultList.splice(0, 10).map((item, index) => {
              return (
                <div className="addr_cell" key={ index } onClick={ this.setCurrentAddress.bind(this, item) }>
                  <div className="addr-detail_cell">
                    <p className="addr_name">{ item.name }</p>
                    <p className="addr-detail_txt">{ item.address }</p>
                  </div>
                  <div className="addr-distance_cell">{ item.distance }</div>
                </div>
              )
            }) }
          </section>
          <section className="no_address" style={{ display: showSearchResult }}>
            <div>
            <p>找不到地址？</p>
            <p>请尝试只输入小区、写字楼或学校名</p>
            <p>详细地址（如门牌号）可稍后输入</p>
            </div>
          </section>
          <section className="current_address" style={{ display: hiddenSearchResult }}>
            <h4>当前地址</h4>
            <div className="current_address_msg">
              <span className="cur_addr" onClick={ this.setCurrentAddress.bind(this, this.props.site) }>
                { this.props.curAddress }
              </span>
              <span className="pos_address" onClick={this.getLocation}>
                <svg className={this.state.rotate?'rotate':'cc'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" version="1.1"><g fillRule="evenodd" fill="none"><circle cx="7.5" cy="7.5" r="7" stroke="#2395FF"/><path fill="#2395FF" d="M7 0h1v5H7zM7 10h1v5H7zM10 7h5v1h-5zM0 7h5v1H0z"/></g></svg>
                <span>重新定位</span>
              </span>
            </div>
          </section>
          <section className="delivery_address">
            <h4>收货地址</h4>
            <div className="detail_address_group">
              {
                this.state.addressList.length > 0 ? this.state.addressList.map((user, key) => {
                  return (
                    <div key={key}  className="detail_address_cell" onClick={ this.modifySite.bind(this, user) }>
                      <p>
                        <span>{user.name}</span>
                        <span>{user.sex === '1' ? '先生' : user.sex === '2' ? '女士' : ''}</span>
                        <span>{user.phone}</span>
                      </p>
                      <p>{user.address}</p>
                    </div>
                  )
                }) : null
              }
            </div>
          </section>
        </div>
        {
          this.state.showCityList ? <CityList currentCity={ this.props.currentCity } chooseCity={ this.chooseCity } /> : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  curAddress: state.getAddress.curAddress,
  currentCity: state.getAddress.currentCity,
  searchResultList: state.getAddress.searchResultList,
  site: state.getAddress.site
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setCurrentlocation,
  setCurrentCity,
  requestSearchLocation,
  setCurrentAddress
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(getAddress))