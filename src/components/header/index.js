import React, { Component } from 'react'
import BackBtn from '../backButton'
import './index.css'

class Header extends Component {
  render () {
    return (
      <header className="use_header">
        <div className="use_header_bg">
          <BackBtn />
				  <h1 className='use_header_title'>{this.props.title}</h1>
        </div>
      </header>
    )
  }
}

export default Header
