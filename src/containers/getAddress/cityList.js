import React, { Component } from 'react'
import Header from '../../components/header'
import './cityList.css'

import { getCityList } from '../../reducers/getAddress'
import { likeSearchCity } from '../../api/config'

class CityList extends Component {
  constructor () {
    super ()
    this.state = {
      cityList: [],
      alphabet: [],
      resultList: []
    }
  }

  componentDidMount () {
    const list = getCityList()
    this.setState({
      cityList: list.cityList,
      alphabet: list.alphabet
    })
  }

  handleClick (item) {
    document.querySelector('#' + item).scrollIntoView(true)
  }

  onChangeCity = (event) => {
    let cityName = event.target.value
    const res = likeSearchCity(this.state.cityList, cityName)
    const resultList = res.length > 100 ? res.splice(0, 50) : res
    this.setState({
      resultList
    })
  }

  handleClickCity (city) {
    this.props.chooseCity(city)
  }

  render () {
    let cityList = this.state.cityList

    return (
      <div className="cityList_container">
        <Header title="城市选择" />
        <div className="city_input">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="search_icon"><path fillOpacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
          <input type="search" placeholder="请输入城市名或拼音" autoFocus className="search_adderss_input" onChange={ this.onChangeCity } />
        </div>
        <div className="cur-city_block" style={{ display: this.props.currentCity ? '' : 'none' }}>
          <p>当前定位城市</p>
          <div>{ this.props.currentCity }</div>
        </div>
        <div className="city-list_scroll" style={{ display: this.state.resultList.length > 0 ? 'none' : '' }}>
          { cityList.map((item, index) => {
            return (
              <div id={ item.idx } className="city_block" key={index}>
                <div className="city-block_title">{ item.idx }</div>
                { item.cities.map((city, i) => {
                  return (
                    <div className="city-block_content" key={i} onClick={ this.handleClickCity.bind(this, city) }>
                      <span>{ city.name }</span>
                    </div>
                  )
                }) }
              </div>
            )
          }) }
        </div>
        <div className="alphabet_list">
          { this.state.alphabet.map((item, index) => 
            <span key={index} onClick={ this.handleClick.bind(this, item) }>{item}</span>
          ) }
        </div>
        <div className="city-search_list" style={{ display: this.state.resultList.length > 0 ? '' : 'none' }}>
          { this.state.resultList.map((city, i) => 
            <div className="city-block_content" key={i} onClick={ this.handleClickCity.bind(this, city) }>
              <span>{ city.name }</span>
            </div>
          ) }
        </div>
      </div>
    )
  }
}

export default CityList
