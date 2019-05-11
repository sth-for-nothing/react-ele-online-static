import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import BackBtn from '../../components/backButton'
import ShopList from '../../components/main/shopList'
import { requestSearchResult, requestSearhShopList } from '../../api/getData'
import { formatUrl } from '../../api/config'
import './search.css'

class Search extends Component {
  constructor () {
    super ()
    this.state = {
      customColor: '#999',
      searchResultList: null,
      searchShopList: null,
      searchWord: false,
      searching: false,
      showHistory: false
    }
  }

  componentDidMount () {
    document.title = '搜索'
    const historyList = this.getHistory()
    if (historyList) {
      this.setState({
        showHistory: true
      })
    }
  }

  onChangeSite (event) {
    let keyword = event.target.value
    if (!keyword) {
      const historyList = this.getHistory()
      this.setState({
        showHistory: historyList ? true : false,
        searchWord: false,
        searching: false
      })
    } else {
      requestSearchResult(keyword).then(res => {
        this.setState({
          searchResultList: res || null
        })
      })
  
      this.props.history.replace(`search`)
      this.setState({
        searchWord: true,
        showHistory: false
      })
    }
  }

  searchRest (rest) {
    this.props.history.push({
      pathname: `/shop/${ rest.id }`,
    })
  }

  searchWord (word) {
    // 替换 history state
    this.props.history.replace(`search?keyword=${word}`)
    this.setState({
      searchShopList: [],
      searchWord: false,
      searching: true,
      showHistory: false
    })
    this.refs.searchRef.value = word
    requestSearhShopList(word).then(res => {
      const data = res.inside[0].restaurant_with_foods
      if (data) {
        this.setState({
          searchShopList: data,
          searching: false,
          searchWord: false
        })
      }
    })
    // save history into storage
    this.saveHistory(word)
  }

  doSearch = (keyword) => {
    let value = typeof keyword !== 'string' ? this.refs.searchRef.value : keyword
    this.searchWord(value)
  }

  saveHistory = (newItem) => {
    const historyList = this.getHistory() || []
    if (historyList.indexOf(newItem) > -1) return
    historyList.push(newItem)
    window.localStorage.setItem('SEARCH_HISTORY', JSON.stringify(historyList))
  }

  getHistory = () => JSON.parse(window.localStorage.getItem('SEARCH_HISTORY'))

  render () {
    const data = this.state.searchResultList ? this.state.searchResultList : null
    const searchRestList = data && data.restaurants.length > 0 ? data.restaurants.map((rest, key) => {
      return (
        <li key={key} onClick={ this.searchRest.bind(this, rest) }>
          <div className="search-rest_item">
            <img src={ formatUrl(rest.image_path, 'restMini') } alt={ rest.name } />
            <div className="rest-item_detail">
              <div>
                <p className="rest-item_name">{ rest.name }</p>                
              </div>
              <span className="rest_rating">评价{ rest.rating }</span>
            </div>
          </div>
        </li>
      )
    }) : null

    const searchWordList = data && data.words.length > 0 ? data.words.map((word, key) => {
      return (
        <li key={key} className="search-word_item" onClick={ this.searchWord.bind(this, word) }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="search_icon"><path fillOpacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
          <p>{ data.words[key] }</p>
        </li>
      )
    }) : null

    const historyList = JSON.parse(window.localStorage.getItem('SEARCH_HISTORY'))

    return (
      <div className="search_page">
        <div className="search_header">
          <BackBtn customColor={ this.state.customColor } />
          <form className="search-hd_input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="search_icon"><path fillOpacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
            <input ref="searchRef" type="search" placeholder="请输入商家、商品名称" autoFocus className="search-entity_input" onChange={ this.onChangeSite.bind(this) } />
            <div className="search-submit_btn" onClick={ this.doSearch.bind(this) }>搜索</div>
          </form>
        </div>
        <div className="search_body">
          <ul className="search-result_ul" style={{ display: this.state.searchWord ? '' : 'none' }}>
            { searchRestList }
            { searchWordList }
          </ul>
          <div className="search-result_shopList" style={{ display: this.state.showHistory ? 'none' : '' }}>
            <div className="loading_svg" style={{ display: this.state.searching ? '' : 'none' }}>
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M955.261 575.322h-126.643c-34.955 0-63.322-28.37-63.322-63.322s28.37-63.322 63.322-63.322h126.643c34.955 0 63.322 28.37 63.322 63.322s-28.37 63.322-63.322 63.322v0zM780.616 332.925c-24.696 24.696-64.842 24.696-89.538 0s-24.696-64.842 0-89.538l89.538-89.538c24.696-24.696 64.842-24.696 89.538 0s24.696 64.842 0 89.538l-89.538 89.538zM512 1018.582c-34.955 0-63.322-28.37-63.322-63.322v-126.643c0-34.955 28.37-63.322 63.322-63.322s63.322 28.37 63.322 63.322v126.643c0 34.955-28.37 63.322-63.322 63.322v0zM512 258.707c-34.955 0-63.322-28.37-63.322-63.322v-126.643c0-34.955 28.37-63.322 63.322-63.322s63.322 28.37 63.322 63.322v126.643c0 34.955-28.37 63.322-63.322 63.322v0zM243.384 870.157c-24.696 24.696-64.842 24.696-89.538 0s-24.696-64.842 0-89.538l89.538-89.538c24.696-24.696 64.842-24.696 89.538 0s24.696 64.842 0 89.538l-89.538 89.538zM243.384 332.925l-89.538-89.538c-24.696-24.696-24.696-64.842 0-89.538s64.842-24.696 89.538 0l89.538 89.538c24.696 24.696 24.696 64.842 0 89.538-24.822 24.696-64.842 24.696-89.538 0v0zM258.707 512c0 34.955-28.37 63.322-63.322 63.322h-126.643c-34.955 0-63.322-28.37-63.322-63.322s28.37-63.322 63.322-63.322h126.643c34.955 0 63.322 28.37 63.322 63.322v0zM780.616 691.075l89.538 89.538c24.696 24.696 24.696 64.842 0 89.538s-64.842 24.696-89.538 0l-89.538-89.538c-24.696-24.696-24.696-64.842 0-89.538 24.822-24.696 64.842-24.696 89.538 0v0zM780.616 691.075z" fill="#555555"></path></svg>
            </div>
            {
              this.state.searchShopList ? <ShopList data={ this.state.searchShopList } /> : null
            }
          </div>
          <div className="search-history_block" style={{ display: this.state.showHistory ? '' : 'none' }}>
            <header className="search_history">
              <span>搜索历史</span>
              <div className="clear_history">
                <svg viewBox="0 0 512 512" id="bin" width="100%" height="100%"><path d="M64 160v320c0 17.6 14.4 32 32 32h288c17.6 0 32-14.4 32-32V160H64zm96 288h-32V224h32v224zm64 0h-32V224h32v224zm64 0h-32V224h32v224zm64 0h-32V224h32v224zM424 64H320V24c0-13.2-10.8-24-24-24H184c-13.2 0-24 10.8-24 24v40H56c-13.2 0-24 10.8-24 24v40h416V88c0-13.2-10.8-24-24-24zm-136 0h-96V32.401h96V64z"></path></svg>
              </div>
            </header>
            <section>
              {
                historyList ? historyList.map((item, key) => {
                  return (
                    <div className="history_item" key={key} onClick={ this.doSearch.bind(this, item) }>{ item }</div>
                  )
                }) : null
              }
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Search)