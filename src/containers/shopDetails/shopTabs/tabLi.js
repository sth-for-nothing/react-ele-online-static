import React,{Component} from 'react'
import './tabs.css'
class TabsLi extends Component{
	constructor(props){
		super(props)
		this.state = {
      current: 0
    }
    this.scrollListenerFunc = this.scrollListenerFunc.bind(this)
  }

  scrollListenerFunc () {
    // let tabheight = this.refs.tabsRef.clientHeight || this.refs.tabsRef.offsetHeight,
    let tabDivToTop = null,
    scrTop = document.documentElement.scrollTop || document.body.scrollTop
    //获取滚动的距离，或者说页面超出可视窗口的高度
    tabDivToTop = this.refs.tabsRef ? this.refs.tabsRef.offsetTop - scrTop : 1
    if (tabDivToTop < 0) {
      this.props.recepSignal(true)
    } else {
      this.props.recepSignal(false)
    }
  }

  componentDidMount () {
    let tabheight = this.refs.tabsRef.clientHeight || this.refs.tabsRef.offsetHeight
    this.props.getTabHeight(tabheight)
    document.addEventListener('scroll', this.scrollListenerFunc)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollListenerFunc)
  }

	clickTab (index) {
		this.setState({
			current:index
		})
  }

	render() {
		return(
			<div className="shoptabs"  ref="orderRef" id="shoptabs">
        <nav className="tabs_header" ref="tabsRef">
          { this.props.data.map((item, index) => {
              return (
                <div className={`tab_cell ${this.state.current === index ? 'tab_cell_active' : ''}`} key={ index } onClick={ this.clickTab.bind(this, index) }>
                    <p className="tab_title">
                    { item.title }
                    <span className="tab_underline"></span>  
                    </p>
                </div>
              )
          }) }
        </nav>   
        <div className="tabs_body">
          { React.Children.map(this.props.children, child => {
            return (
              <div style={{ display: Number(child.key) === Number(this.state.current) ? 'block' : 'none' }}>{ child }</div>
            )
          }) }
        </div>
			</div>
		)
	}
}

export default TabsLi
