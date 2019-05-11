import React,{ Component } from 'react'
import './tag.css'

class Tag extends Component {
  render() {
    return(
      <li className={ `comment-tag_li ${ this.props.activeTag ? 'activeTag' : '' }` } onClick={ this.props.handleClick }>
        { this.props.tagName } { this.props.count > 0 ? this.props.count : null }
      </li>
    )
  }
}

export default Tag
