## 创建项目
create-react-app react-order
> eject 暴露 create-react-app 中 webpack 的配置     
`npm run eject`     
package.json 增加了很多的依赖

## 配置 `less` && `px2rem`
`cd config/webpack.config.js`
```js
// /\.(css)$/ 修改为test:/\.(css|less)$/,
const cssRegex = /\.(css|less)$/;
const cssModuleRegex = /\.module\.(css|less)$/;

{
  test: cssRegex,
  exclude: cssModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 1,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    // 添加
    'less-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
},
// Adds support for CSS Modules (https://github.com/css-modules/css-modules)
// using the extension .module.css
{
  test: cssModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 1,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: true,
      getLocalIdent: getCSSModuleLocalIdent,
    },
    // 添加
    'less-loader'
  ),
},
```
```js
// 添加
const px2rem = require('postcss-px2rem')

{
    // Options for PostCSS as we reference these options twice
    // Adds vendor prefixing based on your specified browser support in
    // package.json
    loader: require.resolve('postcss-loader'),
    options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebook/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
        autoprefixer: {
            flexbox: 'no-2009',
        },
        stage: 3,
        }),
        // 添加
        px2rem({remUnit: 75}),
    ],
    sourceMap: isEnvProduction && shouldUseSourceMap,
    },
},
```

## 全局样式以及 rem
`public`目录下，`index.html` 引入样式表（或 reset.css）

```js
  <script type="text/javascript">
		(function(psdw){
			var dpr=0 , rem=0 , scale=0;
			var htmlDOM=document.documentElement;
			dpr=window.devicePixelRatio;
			var currentWidth=htmlDOM.clientWidth;
			scale=currentWidth/psdw;
			rem=psdw/10;
			rem=rem*scale;
			htmlDOM.style.fontSize=rem+'px';
			htmlDOM.setAttribute('data-dpr',dpr)
		})(750)
	</script>
```

## 底部 Navlink
`fixed` 定位 | `flex` 布局 | `activeClassName` 激活类 | `<svg><path> fill` 属性 样式随 `active` 改变

## header
- 渐变 
`background-image: linear-gradient(90deg,#0af,#0085ff);`
- border 画三角形
```css
border-style: solid;
border-width: 7px;
border-color: transparent;
border-top-color: #fff;
```

## 定位跳转与返回
> 点击获取地址 跳转至 `getAddress` 页面，url 不改变，且 前进后退按钮（`history.forward()、history.back()`）有效

效仿单页应用的路由特性，利用 `historty` 对象 `pushState` 方法添加进 历史记录，再通过 组件的挂载与卸载生命周期 监听 `popstate` 事件的触发 重绘页面实现跳转

```js
  componentWillMount () {
    window.history.pushState({
      page: 'home'
    }, '', '')

    window.addEventListener('popstate', this._isCurrent)
  }

    // 添加历史记录
  _addHistory () {
    window.history.pushState({
      page: 'getAddress',
    }, '', '')
  }

  // 通过 history 判断
  _isCurrent = () => {
    if (!window.history.state) return
    if (window.history.state.page === 'getAddress') {
      this.setState({
        getAddress: true
      })
      this._bodyoverflow()
    } else if (window.history.state.page === 'home') {
      this.setState({
        getAddress: false
      })
      window.document.body.style.overflow = 'auto'
    }
  }

  componentWillUnmount () {
    window.removeEventListener('popstate', this._isCurrent)
  }
```

## 跨域
`/package.json`
```json
"proxy": "https://"
```

## redux 使用注意
- 异步请求需要中间件 (`applyMiddleware(thunk)`)
```js
const store = createStore(rootReducer, applyMiddleware(thunk))
```

- mapStateToProps && mapDispatchToProps
```js
const mapStateToProps = (state) => ({
  shopList: state.shopList.list
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  requestGetShopList
}, dispatch)
```
> `mapStateToProps` 是一个函数，用于建立组件跟store的state的映射关系，一定要返回一个object

> `mapDispatchToProps` 用于建立组件跟store.dispatch的映射关系, 可以是一个object，也可以传入函数

> `bindActionCreators` 直接将action包装成可以被调用的函数

## react-swipe 使用


## react-router
### 路由传参几种方式
1. params
```js
<Route path='/path/:name' component={Path}/>
<link to="/path/2">xxx</Link>
this.props.history.push({pathname:"/path/" + name});
读取参数用:this.props.match.params.name
```
2. query
> query 参数不会显示在地址栏
```js
<Route path='/query' component={Query}/>
<Link to={{ path : ' /query' , query : { name : 'sunny' }}}>
this.props.history.push({pathname:"/query",query: { name : 'sunny' }});
读取参数用: this.props.location.query.name
```
3. search
```js
<Route path='/web/departManange ' component={DepartManange}/>
<link to="web/departManange?tenantId=12121212">xxx</Link>
this.props.history.push({pathname:"/web/departManange?tenantId" + row.tenantId});
读取参数用: this.props.location.search
```
4. state
···

参考：
[react 路由传参](https://www.jianshu.com/p/ad8cc02b9e6c)

### withRouter 
```js
import { withRouter } from 'react-router'
this.props.history.push({
  pathname: `/shop`,
  query: {
    id: data.id
  }
})
```
> [router 4.2 ：js 控制路由跳转](https://segmentfault.com/a/1190000013912862?utm_source=tag-newest)

## React.Children.map
> React.Children.map 是顶层API之一，为处理 this.props.children 这个封闭的数据结构提供了有用的工具

```js
使用方法：
React.Children.map(this.props.children, function (child) {
    return <li>{child}</li>;
})

其他方法
this.props.children.forEach(function (child) {
    return <li>{child}</li>
})
```
> 不能保证 props.children 将是一个数组, 使用 props.children.map 它来映射 child 父组件内部会抛出错误

[React Child 深入理解](https://segmentfault.com/a/1190000011527160#articleHeader4)

## h5 `dl dt dd` 标记使用
> <dl>、<dt>、<dd>通常被称为定义性列表, 很像<ul><li>这个标签组合，但<dl>、<dt>、<dd>通常是用来描述一些术语定义，比如附录里的词汇表，或用来显示key-value这样成对的键和值。


## HTML5 scrollIntoView 实现滚动页面
> shopMenu 使用 锚点 + scrollIntoView 实现 `document.querySelector('#' + id).scrollIntoView(true)`

```js
scrollIntoView(true) 元素上边框与视窗顶部齐平
scrollIntoView(false) 元素下边框与视窗底部齐平
```
```js
{
  behavior: "auto" | "instant" | "smooth", // 默认 auto
  block: "start" | "center" | "end" | "nearest", // 默认 center
  inline: "start" | "center" | "end" | "nearest", // 默认 nearest
}
```
```js
`behavior` 表示滚动方式。auto 表示使用当前元素的 scroll-behavior 样式。instant 和 smooth 表示 直接滚到底 和 使用平滑滚动。    
`block` 表示块级元素排列方向要滚动到的位置。对于默认的 writing-mode: horizontal-tb 来说，就是竖直方向。start 表示将视口的顶部和元素顶部对齐；center 表示将视口的中间和元素的中间对齐；end 表示将视口的底部和元素底部对齐；nearest 表示就近对齐。    
`inline` 表示行内元素排列方向要滚动到的位置。对于默认的 writing-mode: horizontal-tb 来说，就是水平方向。其值与 block 类似。
```

- scroll-behavior
> css 样式，只接受两个自定义值：auto 和 smooth，默认值为 auto，表示立刻滚到底；smooth 即表示平滑滚动

## window.removeEventListener 失效
```js
  componentDidMount () {
    window.addEventListener('scroll', this.scrollListenerFunc.bind(this))
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollListenerFunc.bind(this))
  }
```
> 原因：js里 `bind` 的用法是给函数绑定一个上下文，然后返回一个 **新函数**，`addEventListener` 和`removeEventListener` 用的是bind的返回值，监听和移除的**不是同一个对象**.

**解决办法：**把 bind 写在 constructor 里面
```js
constructor () {
  super()
  this.onScroll = this.onScroll.bind(this)
}
onScroll () {
  // ...
}
componentDidMount () {
  window.addEventListener('scroll', this.onScroll)
}
componentWillUnmount () {
  window.removeEventListener('scroll', this.onScroll)
}
```
react guide也是建议用这种写法：(https://github.com/JasonBoy/javascript/tree/master/react#methods-%E5%87%BD%E6%95%B0)

## 阻止事件冒泡
1. 合成事件与原生事件
> 合成事件：在 jsx 中绑定的事件
```js
<a onClick={ (e)=>this.handleClick(e) }>点击</a>
```
> 原生事件：js 原生代码绑定的事件
```js
document.body.addEventListener('click', e => {
// 通过e.target判断阻止冒泡
  if(e.target && e.target.matches('a')) {
    return
  }
})
```

2. 阻止冒泡
> 阻止合成事件间的冒泡 `e.stopPropagation()`
```js
handleClick (e) {
  e.stopPropagation()
}
render() {
  return(
    <div ref="test" onClick={()=>this.testClick()}>
      <a ref="update" onClick={(e)=>this.handleClick(e)}>更新</a>
    </div>
  )
}
```

> 阻止原生事件与最外层 document 上的事件的冒泡 `e.nativeEvent.stopImmediatePropagation()`
```js
componentDidMount() {
  document.addEventListener('click', () => {
    console.log('document')
  })
}
handleClick (e) {
  e.nativeEvent.stopImmediatePropagation()
  console.log('a')
}
render() {
  return (
    <div ref="test">
      <a ref="update" onClick={(e)=>this.handleClick(e)}>更新</a>
    </div>
  )
}
```

> 阻止合成事件与除最外层document上的原生事件上的冒泡，通过判断`e.target`
react阻止冒泡事件: [react阻止冒泡事件](https://www.jianshu.com/p/e0894bd588f4)