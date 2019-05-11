import React,{ Component } from 'react'
import { formatUrl, escapeID } from '../../../../api/config'
import './sidebar.css'

class SideBar extends Component{

  constructor() {
    super()
    this.state = {
      current: 0,
    }
  }

  componentWillReceiveProps (nextProp) {
    let activeId = nextProp.activeId
    this.getActiveId(activeId)
  }

  getActiveId = (activeId) => {
    this.props.menuCategory.forEach((item, index) => {
      if (activeId === escapeID(item.name) && index !== this.state.current) {
        this.setState({
          current: index,
        })
      }
    })
  }

  selectCate(name) {
    document.querySelector('#' + escapeID(name)).scrollIntoView({ behavior: 'smooth' })
  }

  render() {

    const imgDom = (url) => {
      let src = formatUrl(url, '26x')
      return (
        <img src={src} alt=""/>
      )
    }

    return(
      <div className="sidebar-category_wrapper">
        <ul className="sidebar-category_ul" >
          { this.props.menuCategory.map((item, index) => {
            return (
              <li className={[
                  "category-item_li",
                  index === this.state.current ? 'category-active_li' : ''
                ].join(" ")} key={ index } onClick={ this.selectCate.bind(this, item.name) }>
                { item.icon_url ? imgDom(item.icon_url) : null }
                <span className="category-item_txt">{ item.name }</span>
              </li>
            )
          }) }
        </ul>    
      </div>
    )
  }
}

export default SideBar
