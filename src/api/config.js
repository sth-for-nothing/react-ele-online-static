import defaultImg from '../images/default_icon.jpeg'
const param = {
  USERID: 5914347498,
  SID: 'qIEhitQydpZO1Y2msEtSJXhSvgmpody2kDEA',
  avgSwipeNum: 10,
}

const URL = {
  // 选择地址页面城市列表
  cityList: 'https://shadow.elemecdn.com/lib/city-list@0.0.3/city_list.json',
  // 搜索地址
  addressSearch: 'restapi/bgs/poi/search_poi_nearby_alipay',
  // 首页店铺列表
  restaurants: 'restapi/shopping/v3/restaurants',
  // 首页轮播图分类
  foodEntry: 'https://www.easy-mock.com/mock/5c9cad0707c0ba1a896adc85/elem/entries',
  // 获取首页轮播分类 id 集
  siftFactors: 'restapi/shopping/v2/foods_page/sift_factors',
  // 每种分类 id
  category: 'restapi/shopping/v2/restaurant/category',
  // 图片前后缀
  shopImgUrlPrefix: 'https://fuss10.elemecdn.com/',
  shopImgUrlSuffix: '?imageMogr/format/webp/thumbnail/',
  // 首页店铺图片
  coverImgSize: '!130x130r/gravity/Center/crop/130x130/',
  // 店内食物图片
  foodImgSize: '!140x140r/gravity/Center/crop/140x140/',
  // swipe 导航分类图片
  navCategoryImgSize: '!90x90r/gravity/Center/crop/90x90/',
  // 店铺背景
  bgImgSize: '750x/thumbnail/!40p/blur/50x40/',
  // 店铺头像
  avatarSize: '150x',
  // 评论区用户头像
  commentAvatar: '!60.032001953125x60.032001953125r/gravity/Center/crop/60.032001953125x60.032001953125/',
  // 评论图片
  commentImg: '300x',
  // 商家实景
  shopCoverAlbum: '!200x200r/gravity/Center/crop/200x200/',
  // 搜索商家结果小图标
  restMini: '48x',
  // 搜索结果食物图标
  searchFood: '176x',
  // 订单页面图标
  orderFood: '!72x72r/gravity/Center/crop/72x72/',
  // 订单商家图标
  orderShop: '!64x64r/gravity/Center/crop/64x64/',

  geohash: 'restapi/bgs/poi/reverse_geo_coding',
  // 店铺详情
  shopDetails: '/pizza/shopping/restaurants',
  // 店铺评价（原链接有 referer，所以自己做的假数据）
  shopComments: 'https://www.easy-mock.com/mock/5c9cad0707c0ba1a896adc85/elem/pizza/ugc/restaurants',
  // 默认图片
  defaultImg,
  // 搜索商品
  searchEntity: 'restapi/shopping/v1/typeahead',
  // 搜索结果商家列表
  searchShopList: 'restapi/shopping/v2/restaurants/search',

  // 本地服务器登录
  root: 'http://127.0.0.1:666'
}

// 处理图片路径及后缀
const formatUrl = (path, size = '') => {
  if (!path) return
  let str2arr = path.split('')
  str2arr.splice(1, 0, '/')
  str2arr.splice(4, 0, '/')
  let arr2str = str2arr.join('')

  const matchPNG = /\S+png$/,
    matchJPEG = /\S+jpeg$/
  
  let is_PNG = matchPNG.test(arr2str),
    is_JPEG = matchJPEG.test(arr2str)

  let format = is_PNG ? '.png' : is_JPEG ? '.jpeg' : ''

  let imgSize = ''
  switch (size) {
    case 'avatar':
      imgSize = URL.avatarSize
      break
    case 'bg':
      imgSize = URL.bgImgSize
      break
    case 'food':
      imgSize = URL.foodImgSize
      break
    case 'shop':
      imgSize = URL.coverImgSize
      break
    case 'nav':
      imgSize = URL.navCategoryImgSize
      break
    case 'commentAvatar':
      imgSize = URL.commentAvatar
      break
    case 'commentImg':
      imgSize = URL.commentImg
      break
    case 'shopAlbum':
      imgSize = URL.shopCoverAlbum
      break
    case 'restMini':
      imgSize = URL.restMini
      break
    case 'searchFood':
      imgSize = URL.searchFood
      break
    case 'orderFood':
      imgSize = URL.orderFood
      break
    case 'orderShop':
      imgSize = URL.orderShop
      break
    default :
      imgSize = size
  }
  
  return URL.shopImgUrlPrefix + arr2str + format + URL.shopImgUrlSuffix + imgSize
}

// 处理 swipe 需要的 数据
const formatSwipeData = (data) => {
  let tempArr = []
  Object.assign(tempArr, data)

  // 格式化 url
  let dataArr = tempArr.map((item, index) => {
    tempArr[index].image_hash = formatUrl(item.image_hash, 'nav')
    return item
  })

  // 页数
  let swipeNum = Math.ceil(dataArr.length / param.avgSwipeNum)

  const splitArr = (arr, num) => {
    let list = []
    for (let i = 0; i < num - 1; i++) {
      let newArr = arr.splice(0, param.avgSwipeNum)
      list.push(newArr)
    }
    list.push(arr)
    // 两页 swipe loop 会出现白屏，通过添加 dom 节点，消耗较大
    // if (num === 2) {
    //   let [fwList, bcList] = list
    //   list = [...list, fwList, bcList]
    // }
    return list
  }

  // 分离成每页最多 10（param.avgSwipeNum） 个的二维数组
  let swipeList = splitArr(dataArr, swipeNum)
  
  return swipeList
}

// id 转义 "/" 其他符号另加
const escapeID = (s) => {
  // 去掉转义字符  
  s = s.replace(/[\'\"\\\/\b\f\n\r\t\s]/g, '')
  // 去掉特殊字符  
  s = s.replace(/[\@\#\$\%\^\&\*\{\}\:\.\"\L\<\>\?\❣]/)
  // 数字转字母
  const str2arr = s.split('')
  str2arr.forEach((item, key) => {
    if (/\d/.test(item)) {
      str2arr[key] = String.fromCharCode(65 + Number(item))
    }
  })
  s = str2arr.join('')
  return s
}

// 地址模糊查询
const likeSearchCity = (data, keywords) => {
  if (!data || !keywords || !Array.isArray(data)) return []

  const isPinyin = /^[A-Za-z]+$/.test(keywords)
  const isHanzi = /^[\u4e00-\u9fa5]{0,}$/.test(keywords)

  const result = []
  data.forEach(item => {
    item.cities.forEach(city => {
      if (isPinyin && city.pinyin.indexOf(keywords) !== -1) {
        result.push(city)
      } else if (isHanzi && city.name.indexOf(keywords) !== -1) {
        result.push(city)
      }
    })
  })
  return result
}

// 时间戳转化
const timetrans = (time) => {
  let date = new Date(parseInt(time))
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + h + m + s
}

export {
  param,
  URL,
  formatUrl,
  formatSwipeData,
  escapeID,
  likeSearchCity,
  timetrans
}