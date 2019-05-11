import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import DefaultAvatar from '../../images/avatar.png'
import './my.css'

class My extends Component {
  constructor () {
    super ()
    this.state = {
      login: false,
      username: null
    }
  }

  doLogin = () => {
    if (this.state.login) return
    this.props.history.push({
      pathname: '/login'
    })
  }

  logout = () => {
    window.localStorage.removeItem('USER')
    console.log('退出登录')
    this.props.history.replace('/')
  }

  componentDidMount () {
    document.title = '我的'
    const user = window.localStorage.getItem('USER')
    if (!user) return
    let { username, phone } = JSON.parse(user)
    this.setState({
      username,
      phone,
      login: true
    })
  }

  getMyAddr () {
    this.props.history.push('/address')
  }

  render () {
    const menuLine = (iconSvg, content) => 
      <a href="javascript:void(0);" className="menuLine">
        <aside>
        <svg t="1555218051585" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24862"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474c-6.1-7.7-15.3-12.2-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1 0.4-12.8-6.3-12.8z" p-id="24863" fill="#666666"></path></svg>
        </aside>
        <div className="menu_content">
          { content }
          <span className="more_icon">
            <svg fill="#bbb" viewBox="0 0 1024 1024" id="arrow-right" className="icon" width="100%" height="100%"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" className="selected"></path></svg>
          </span>
        </div>
      </a>

    return (
      <div className="myPage_main">
        <section>
          <div className="user-info_header" onClick={ this.doLogin }>
            <div className="user_avatar">
              <img src={DefaultAvatar} alt="头像" />
            </div>
            <div className="user-info_content">
              <p className="username">{ this.state.login ? this.state.username : '登录/注册' }</p>
              <p className="phone" style={{ display: this.state.login ? '' : 'none' }}>
                <svg viewBox="0 0 655 1024" id="mobile" width="100%" height="100%"><path d="M0 122.501v778.998C0 968.946 55.189 1024 123.268 1024h408.824c68.52 0 123.268-54.846 123.268-122.501V122.501C655.36 55.054 600.171 0 532.092 0H123.268C54.748 0 0 54.846 0 122.501zM327.68 942.08c-22.622 0-40.96-18.338-40.96-40.96s18.338-40.96 40.96-40.96 40.96 18.338 40.96 40.96-18.338 40.96-40.96 40.96zM81.92 163.84h491.52V819.2H81.92V163.84z"></path></svg>
                <span>{ this.state.phone }</span>
              </p>
            </div>
            <div className="more_icon">
              <svg fill="#fff" viewBox="0 0 1024 1024" id="arrow-right" className="icon" width="100%" height="100%"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" className="selected"></path></svg>
            </div>
          </div>
        </section>
        <section className="menu-line_section" onClick={ this.getMyAddr.bind(this) }>
          { menuLine('myAddress', '我的地址') }
        </section>
        <section className="menu-line_section">
          { menuLine('', '设置') }{ menuLine('', '客服') }{ menuLine('', '其他') }
        </section>
        <section style={{ display: this.state.login ? '' : 'none' }}>
          <button className="logout" onClick={ this.logout }>退出登录</button>
        </section>
      </div>
    )
  }
}

export default withRouter(My)
