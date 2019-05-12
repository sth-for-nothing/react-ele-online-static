import React from 'react'
import Header from '../../components/header'
import './myAddress.css'

class MyAddress extends React.Component {
  constructor () {
    super ()
    this.state = {
      name: '',
      phone: '',
      address: '',
      sex: '1'
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }
  componentDidMount () {
    document.title = '我的地址'
    const addr = JSON.parse(localStorage.getItem("RECEIVE_ADDRESS")) ? JSON.parse(localStorage.getItem("RECEIVE_ADDRESS"))[0] : []
    const user = this.props.location.state ?  this.props.location.state.user : addr
    this.setState({
      ...user.address
    })
  }

  changeSex (e) {
    const el = e.target
    const value = el.getAttribute('value')
    this.setState({
      sex: value
    })
  }

  saveAddr () {
    let { name, sex, phone, address } = this.state
    localStorage.setItem('RECEIVE_ADDRESS', JSON.stringify([{ name, sex, phone, address }]))
    window.history.go(-1)
  }

  handleInputChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div>
        <Header title="我的地址" />
        <form className="address_block" action="javascript:;" ref="addrForm">
          <label className="user_name">
            <div className="left_title">联系人</div>
            <div className="rt_content">
              <div className="hd_name">
                <input type="text" name="name" onChange={ this.handleInputChange } id="name" value={ this.state.name } />
              </div>
            </div>
          </label>
          <label>
            <div className="left_title"></div>
            <div className="rt_content">
              <div className="ft_sex" onClick={ this.changeSex.bind(this) }>
                <span className={ `sex_checkbox ${ this.state.sex === '1' ? 'active' : null }`} id="sex_1" value="1">先生</span>
                <span className={ `sex_checkbox ${ this.state.sex === '2' ? 'active' : null }`} id="sex_2" value="2">女士</span>
              </div>
            </div>
          </label>
          <label className="user_phone">
            <div className="left_title">电话</div>
            <div className="rt_content">
              <input type="tel" name="phone" onChange={ this.handleInputChange } id="phone" value={ this.state.phone }/>
            </div>
          </label>
          <label className="user_addr">
            <div className="left_title">地址</div>
            <div className="rt_content">
              <input type="text" name="address" onChange={ this.handleInputChange } id="address" value={ this.state.address }/>
            </div>
          </label>
          <input type="submit" value="保存" className="saveAddr" onClick={ this.saveAddr.bind(this) } />
        </form>
      </div>
    )
  }
}

export default MyAddress
