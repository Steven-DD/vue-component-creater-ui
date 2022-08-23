/*
 * 存放处理公共事情的js
 */
global.COMMON = {}
/*
 *给html设置font-size
 * */
global.htmlSize = res => {
  var docEl = document.documentElement,
    clientWidth = window.inneridth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) return
  let fontSize = clientWidth / 1920
  return res * fontSize
}
htmlSize()
window.onresize = function () {
  htmlSize()
}
/*
 * 给chart适应宽度
 * */
global.resizeWidth = res => {
  const e = document.createEvent('Event')
  e.initEvent('resize', true, true)
  window.dispatchEvent(e)
}
/*
 * 给chart的一些默认配置
 * */
global.chartconfig = (type, param) => {
  const config = {
    // 颜色配置
    colors: [
      `rgba(144, 255, 255, ${param ? param : 1})`,
      `rgba(33, 137, 255, ${param ? param : 1})`,
      `rgba(255, 209, 38, ${param ? param : 1})`,
      `rgba(149, 118, 255, ${param ? param : 1})`,
      `rgba(9, 255, 169, ${param ? param : 1})`,
      `rgba(255, 105, 53, ${param ? param : 1})`
    ],
    // 鼠标移动样式
    tooltip: {
      showCrosshairs: true, // 展示 Tooltip 辅助线
      shared: true,
      showMarkers: true,
      containerTpl:
        '<div class="g2-tooltip">' +
        '<p class="g2-tooltip-title"></p>' +
        '<ul class="g2-tooltip-list"></ul>' +
        '</div>',
      itemTpl: `
                <div style="margin-bottom: ${htmlSize(5)}px;list-style:none;"  class="g2-tooltip-item">
                <span style="background-color:{color};" class="g2-tooltip-marker"></span>
                {name}: {value}
                </div>
            `,
      domStyles: {
        'g2-tooltip': {
          // 自定义 toolTip 样式
          position: 'absolute',
          // width:'80px',
          // height:'40px',
          backgroundColor: 'rgba(13,21,42,1)',
          border: `${htmlSize(1)}px solid rgba(51,187,255,0.5)`,
          borderRadius: `${htmlSize(3)}px ${htmlSize(3)}px ${htmlSize(3)}px ${htmlSize(3)}px`,
          color: '#fff',
          fontSize: `${htmlSize(12)}px`,
          // textAlign:'center',
          padding: `${htmlSize(2)}px`,
          // paddingLeft: '8px',
          marginTop: `${htmlSize(4)}px`
          // transition:'top 200ms,left 200ms'
        },
        'g2-tooltip-marker': {
          // 自定义 toolTip 样式
          width: `${htmlSize(10)}px`,
          height: `${htmlSize(10)}px`
        },
        'g2-tooltip-title': {
          height: `${htmlSize(18)}px`
        },
        'g2-tooltip-item': {
          height: `${htmlSize(16)}px`
        }
      },
      crosshairs: {
        style: {
          stroke: '#33bbff',
          strokeOpacity: 0.3
        }
      },
      inPlot: false
    },
    // 横纵坐标样式
    textStyle: {
      fill: `${param ? param : '#fff'}`,
      fontSize: htmlSize(12)
    }
  }

  return config[type]
}
/*
 * 设置本地存储
 */
global.setLocalStorage = (key = '', val = '') => {
  localStorage.setItem(key, JSON.stringify(val))
}
/*
 * 获取本地存储
 */
global.getLocalStorage = (key = '') => {
  return JSON.parse(localStorage.getItem(key))
}
/*
 * 获取俩个数之间的随机整数
 */
global.getRandomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
/*
 * 格式化时间
 * @param fmt yyyy(年)，MM(月)，dd(日)，hh(时)，mm(分)，ss(秒)，S(毫秒)，q(季度)
 * @returns {String}  fmt格式的时间字符串
 * @constructor
 */
Date.prototype.formatDate = function (fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!this) return null
  var weekText = ['日', '一', '二', '三', '四', '五', '六']
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'w+': weekText[this.getDay()], //周
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
  return fmt
}
/*
 * 删除数组中指定数字、字符串
 */
Array.prototype.remove = function (val) {
  let arr = []
  for (var i = 0; i < this.length; i++) {
    if (this[i] != val) arr.push(this[i])
  }
  return arr
}
/*
 * 数组/对象深拷贝
 */
global.deepClone = function (source) {
  var sourceCopy = source instanceof Array ? [] : {}
  for (var item in source) {
    if (typeof source[item] === 'object') {
      sourceCopy[item] = deepClone(source[item])
    } else {
      sourceCopy[item] = source[item]
    }
  }
  return sourceCopy
}
//保留N位小数不四舍五入
global.retainDecimal = function (value, n = 2) {
  if (isNaN(parseFloat(value))) {
    return value
  }
  n = Math.pow(10, parseInt(n))
  return Math.floor(parseFloat(value) * n) / n
}
//全局定时器
global.vueTimer = function (vue = null, callBack = null, time = 0) {
  clearTimeout(vue.vueTimer)
  function timeFun() {
    callBack()
    vue.vueTimer = setTimeout(timeFun, time)
  }
  vue.$once('hook:beforeDestroy', () => {
    clearTimeout(vue.vueTimer)
    vue.vueTimer = null
  })
  timeFun()
}
/*
 * Base64编码
 */
global.Base64Encode = function (str = '') {
  return window.btoa(unescape(encodeURIComponent(str)))
}
/*
 * Base64解码
 */
global.Base64Decode = function (str) {
  try {
    return decodeURIComponent(escape(window.atob(str)))
  } catch (err) {
    return false
  }
}
