import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { requestLogin } from '../../reducers/login'
import './login.css'

class Login extends React.Component {
  constructor () {
    super ()
    this.state = {
      message: ''
    }
  }

  componentDidMount () {
    document.title = '登录'
  }

  doLoginSubmit = (e) => {
    e.preventDefault()
    let phone = this.refs.phone.value, password = this.refs.password.value
    let result = this.validate(phone, password)
    if (result) {
      this.setState({
        message: result
      })
    } else {
      this.props.requestLogin(phone, password)
    }
    if (this.timer) clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.setState({
        message: ''
      })
    }, 2000)
  }

  validate = (phone, password) => {
    if (!phone) return '手机号不能为空'
    if (!password) return '密码不能为空'
    if (phone.length !== 11) return '手机号不正确'
    if (password.length < 6 || password.length > 20) return '密码应大于 6 位，小于 20 位'
    return ''
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.message) {
      this.setState({
        message: nextProps.message
      })
    }
    if (this.timer) clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.setState({
        message: ''
      })
      if (nextProps.isLogin) this.props.history.replace('/')
    }, 2000)
  }

  render () {
    return (
      <div className="login_page">
        <div className="login_main">
          <div className="app_logo">
            <svg t="1555231478403" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="575"><path d="M829.314844 672.733867H190.145422c-56.979911 0-103.173689 46.409956-103.173689 103.662933v60.359111h845.5168v-60.359111c0-57.252978-46.205156-103.662933-103.173689-103.662933z" fill="#FFCA6C" p-id="576"></path><path d="M386.321067 672.733867H190.145422c-56.979911 0-103.173689 46.409956-103.173689 103.662933v60.359111h196.175645v-60.359111c0-57.252978 46.193778-103.662933 103.173689-103.662933z" fill="#E5B05C" p-id="577"></path><path d="M855.4496 672.733867c0-191.852089-154.783289-347.386311-345.725156-347.386311-190.930489 0-345.713778 155.522844-345.713777 347.386311" fill="#FFCA6C" p-id="578"></path><path d="M566.977422 330.126222a346.612622 346.612622 0 0 0-57.252978-4.767289c-190.930489 0-345.713778 155.522844-345.713777 347.386311h114.494577c0-172.270933 124.780089-315.209956 288.472178-342.619022z" fill="#E5B05C" p-id="579"></path><path d="M447.294578 211.273956a62.714311 62.429867 90 1 0 124.859733 0 62.714311 62.429867 90 1 0-124.859733 0Z" fill="#FFCA6C" p-id="580"></path><path d="M496.344178 211.285333A62.725689 62.725689 0 0 1 534.243556 153.6 61.872356 61.872356 0 0 0 509.724444 148.571022c-34.474667 0-62.418489 28.080356-62.418488 62.725689 0 34.633956 27.9552 62.714311 62.418488 62.714311 8.704 0 16.987022-1.797689 24.519112-5.028978a62.7712 62.7712 0 0 1-37.899378-57.696711z" fill="#E5B05C" p-id="581"></path><path d="M783.792356 588.561067c-5.814044 0-11.241244-3.618133-13.323378-9.432178-32.028444-89.827556-109.454222-158.139733-202.046578-178.301156-7.645867-1.661156-12.4928-9.238756-10.831644-16.907377s9.193244-12.549689 16.827733-10.888534a304.856178 304.856178 0 0 1 136.965689 69.7344 308.349156 308.349156 0 0 1 85.731555 126.7712 14.244978 14.244978 0 0 1-13.323377 19.023645zM868.898133 745.483378a14.108444 14.108444 0 0 1-11.286755-5.643378c-2.787556-3.709156-9.5232-6.269156-11.650845-6.781156a14.222222 14.222222 0 0 1 6.610489-27.659377c1.820444 0.443733 18.1248 4.664889 27.613867 17.282844a14.244978 14.244978 0 0 1-11.286756 22.801067z" fill="#FFFFFF" p-id="582"></path><path d="M869.512533 665.645511c-3.6864-191.3856-156.080356-346.794667-345.645511-354.2016v-24.564622a76.936533 76.936533 0 0 0 62.418489-75.593956 77.368889 77.368889 0 0 0-9.511822-37.182577 14.119822 14.119822 0 0 0-19.228445-5.563734 14.256356 14.256356 0 0 0-5.5296 19.319467c3.925333 7.122489 5.984711 15.212089 5.984712 23.426844 0 26.749156-21.651911 48.503467-48.275912 48.503467-26.624 0-48.275911-21.754311-48.275911-48.503467s21.651911-48.503467 48.264534-48.503466c6.587733 0 12.970667 1.308444 18.966755 3.879822a14.119822 14.119822 0 0 0 18.568534-7.486578 14.222222 14.222222 0 0 0-7.441067-18.659555 75.776 75.776 0 0 0-30.094222-6.166756c-42.211556 0-76.561067 34.5088-76.561067 76.936533a76.970667 76.970667 0 0 0 62.418489 75.605334v24.553244a354.804622 354.804622 0 0 0-135.213511 32.221867 14.2336 14.2336 0 0 0-6.985956 18.830222 14.108444 14.108444 0 0 0 18.7392 7.031467A327.554844 327.554844 0 0 1 509.724444 339.569778c178.2784 0 324.130133 142.119822 331.275378 319.533511a116.963556 116.963556 0 0 0-11.684978-0.591645H190.145422c-3.948089 0-7.839289 0.2048-11.684978 0.591645a332.629333 332.629333 0 0 1 150.232178-265.534578 14.244978 14.244978 0 0 0 4.107378-19.672178 14.108444 14.108444 0 0 0-19.581156-4.130133c-100.317867 65.809067-160.950044 176.014222-163.248355 295.879111A118.044444 118.044444 0 0 0 72.817778 776.3968v60.359111c0 7.839289 6.337422 14.210844 14.153955 14.210845h845.5168c7.805156 0 14.142578-6.371556 14.142578-14.210845v-60.359111c0-50.824533-32.176356-94.230756-77.118578-110.751289zM101.114311 822.533689v-46.136889c0-49.334044 39.936-89.452089 89.031111-89.452089h639.158045c44.282311 0 81.1008 32.642844 87.904711 75.241245H805.888c-7.816533 0-14.142578 6.371556-14.142578 14.210844 0 7.850667 6.337422 14.222222 14.142578 14.222222h112.457956v31.914667H101.114311z" fill="" p-id="583"></path><path d="M756.8384 762.185956H328.635733c-7.816533 0-14.153956 6.371556-14.153955 14.210844 0 7.850667 6.337422 14.222222 14.153955 14.222222h428.191289c7.816533 0 14.142578-6.371556 14.142578-14.222222a14.165333 14.165333 0 0 0-14.1312-14.210844zM283.147378 762.185956H162.633956c-7.816533 0-14.153956 6.371556-14.153956 14.210844 0 7.850667 6.337422 14.222222 14.153956 14.222222h120.502044c7.816533 0 14.153956-6.371556 14.153956-14.222222 0-7.839289-6.326044-14.210844-14.142578-14.210844z"></path></svg>
          </div>
          <div className="login_form">
            <form>
              <label htmlFor="phone">
                <input type="tel" name="phone" ref="phone" placeholder="手机号" maxLength="11"/>
              </label>
              <label htmlFor="password">
                <input type="password" name="password" ref="password" placeholder="密码"/>
              </label>
              <section className="statement">
                新用户登录即自动注册，并表示已同意
                <a href="javascript:void(0);">《用户服务协议》</a>
              </section>
              <button className="login-submit_btn" onClick={ this.doLoginSubmit }>
                登录
              </button>
            </form>
            <a href="javascript:;" className="about">关于我们</a>
          </div>
        </div>
        <div className="alert_box" style={{ display: this.state.message ? '' : 'none' }}>{ this.state.message }</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.login.isLogin,
  username: state.login.username,
  phone: state.login.phone,
  message: state.login.message
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  requestLogin
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
