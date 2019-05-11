import React,{ Component } from 'react'
import RatingStar from '../../../components/ratingStar/ratingStar'
import { formatUrl, URL } from '../../../api/config'
import './comment.css'

class Comment extends Component {

  render() {
    let comment = this.props.commentData,
       avatar = formatUrl(comment.avatar, 'commentAvatar'),
       rating_txt = (num) => {
         switch (num) {
          case 5:
            return '超赞'
          case 4:
            return '满意'
          case 3:
            return '一般'
          case 2:
            return '较差'
          case 1:
            return '吐槽'
          default:
            return ''
         }
       }

    return(
      <li className="comment">
        <div className="comment_block">
          <div className="commenter_avatar">
            {
              avatar ? <img src={ avatar } alt={ comment.username }/> : <img src={ URL.defaultImg } alt="默认炮姐" />}
          </div>
          <div className="comment_content">
            <div className="content_hd">
              <h3>{ comment.username }</h3>
              <small className="comment_date">{ comment.rated_at }</small>
            </div>
            <div className="rating_star">
              <RatingStar rating={ comment.rating } />
              <span className="rating_txt">{ rating_txt(comment.rating) }</span>
            </div>
            <div className="content">{ comment.rating_text }</div>
            <div className="store_reply">{ comment.reply.content }</div>
            <ul className="comment-img_ul">
              { comment.order_images.map((item, index) => {
                return (
                  <li key={index}>
                   <img src={ formatUrl(item.image_hash, 'commentImg') } alt={item.food_names} />
                  </li>
                )
              }) }
            </ul>
          </div>
        </div>
      </li>
    )
  }
}

export default Comment
