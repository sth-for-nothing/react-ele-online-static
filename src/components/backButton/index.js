import React, { Component } from 'react'
import './index.css'
class BackBtn extends Component {
	handleBack = () => {
    window.history.back()
  }

	render () {
		return (
			<div className="back" onClick={ this.handleBack }>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 32" version="1.1"><path fill={ this.props.customColor || '#fff' } d="M16.552 5.633L14.508 3.59 2.243 15.853 14.508 28.41l2.044-2.043-10.22-10.513z"/></svg>
			</div>
		)
	}
}

export default BackBtn
