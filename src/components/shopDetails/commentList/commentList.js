import React,{ Component } from 'react'
import Tag from '../tag/tag'
import Comment from '../comment/comment'
import './commentList.css'

class CommentList extends Component {
  constructor () {
    super ()
    this.state = {
      activeTag: 0
    }
  }

  handleClick (index) {
    this.setState({
      activeTag: index
    })
  }

  render() {
    return(
      <div className="commentList">
        <ul className="comment-tags_ul">
          { this.props.tags.map((item, index) => {
            return (
              <Tag key={index} tagName={ item.name } count={ item.count } activeTag={ this.state.activeTag === index ? 'active' : '' } handleClick={ this.handleClick.bind(this, index) } />
            )
          }) }
        </ul>
        <div className="comment-list_ul">
          { this.props.comments.map((item, index) => {
            return (
              <Comment commentData={ item } key={index} />
            )
          }) }
        </div>
      </div>
    )
  }
}

export default CommentList
