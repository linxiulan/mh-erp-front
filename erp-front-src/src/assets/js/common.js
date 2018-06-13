/**
 * Created by linxiulan on 2018/3/18.
 */
/* 设置cookie */
export function setCookie (name, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = name + '=' + escape(value) + '; expires=' + date.toGMTString()
}

/* 获取cookie */
export function getCookie (name) {
  if (document.cookie.length > 0) {
    let _start = document.cookie.indexOf(name + '=')
    if (_start !== -1) {
      _start = _start + name.length + 1
      let _end = document.cookie.indexOf(';', _start)
      if (_end === -1) _end = document.cookie.length
      return unescape(document.cookie.substring(_start, _end))
    }
  }
  return ''
}
/*本地缓存*/
export function getLocalStorage (name) {
  return JSON.parse(localStorage.getItem(name))
}

export function setLocalStorage (name, val) {
  localStorage.setItem(name, JSON.stringify(val))
}

export function addLocalStorage (name, addVal) {
  let oldVal = Storage.get(name)
  let newVal = oldVal.concat(addVal)
  setLocalStorage(name, newVal)
}

/* 删除cookie */
export function delCookie (name) {
  setCookie(name, '', -1)
}

export function clearCookie(){
  var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
  }
}

/*去除前后空格*/
export function trim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/*深拷贝*/
export function cloneObj (obj) {
  var str, newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return
  } else if (window.JSON) {
    str = JSON.stringify(obj), //系列化对象
      newobj = JSON.parse(str) //还原
  } else {
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]
    }
  }
  return newobj
}
/*数组合并并去重*/
export function arrayMerging (arr1, arr2) {
  //不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响
  let arr = arr1.concat()
  //或者使用slice()复制，var arr = arr1.slice(0)
  for (var i = 0; i < arr2.length; i++) {
    arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0
  }
  return arr
}

/*验证真实姓名，包括少数名族*/
export function verificationName (str) {
  let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
  return reg.test(str)
}

/*验证手机号码*/
export function verificationPone (str) {
  let reg = /^[1][2,3,4,5,7,8][0-9]{9}$/
  return reg.test(str)
}

/*验证座机*/
export function verificationTel (str) {
  let reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
  return reg.test(str)
}

/*验证车牌号码*/
export function verificationPlateNumber (str) {
  let reg = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/
  return reg.test(str)
}

/*日期格式化*/
export function Dateformat (date, str) {
  var data = new Date(date),
    mat = {},
    check = function (_str) {
      _str = _str.toString()
      if (_str.length < 2) {
        _str = '0' + _str
      }
      return _str
    }
  mat.M = date.getMonth() + 1//月份记得加1
  mat.H = date.getHours()
  mat.s = date.getSeconds()
  mat.m = date.getMinutes()
  mat.Y = date.getFullYear()
  mat.D = date.getDate()
  mat.d = date.getDay()//星期几
  mat.d = check(mat.d)
  mat.H = check(mat.H)
  mat.M = check(mat.M)
  mat.D = check(mat.D)
  mat.s = check(mat.s)
  mat.m = check(mat.m)
  if (str.indexOf(':') > -1) {
    mat.Y = mat.Y.toString().substr(2, 2)
    return mat.Y + '/' + mat.M + '/' + mat.D + ' ' + mat.H + ':' + mat.m + ':' + mat.s
  }
  if (str.indexOf('/') > -1) {
    return mat.Y + '/' + mat.M + '/' + mat.D + ' ' + mat.H + '/' + mat.m + '/' + mat.s
  }
  if (str.indexOf('-') > -1) {
    return mat.Y + '-' + mat.M + '-' + mat.D + ' ' + mat.H + '-' + mat.m + '-' + mat.s
  }
}

/*获取当天日期*/
export function getNowDay () {
  let _date = new Date(),
    _Month = 0
  _date.setTime(_date.getTime())
  _Month = _date.getMonth() + 1
  if (_Month < 10) {
    _Month = '0' + _Month
  }
  let nowDay = _date.getFullYear() + '-' + _Month + '-' + _date.getDate()
  return nowDay
}
/*获取当前月份*/
export function getNowMonth () {
  let _date = new Date()
  _date.setTime(_date.getTime())
  let nowMonth = _date.getFullYear() + '-' + (_date.getMonth() + 1)
  return nowMonth
}
/*获取前一个月*/
export function getLastMonthTime (date, isYear) {
  var Nowdate = new Date(date)
  var vYear = Nowdate.getFullYear()
  var vMon = Nowdate.getMonth() + 1
  var vDay = Nowdate.getDate()
  //每个月的最后一天日期（为了使用月份便于查找，数组第一位设为0）
  var daysInMonth = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
  if (isYear) {
    vYear = Nowdate.getFullYear() - 1
  } else if (vMon == 1) {
    vYear = Nowdate.getFullYear() - 1
    vMon = 12
  } else {
    vMon = vMon - 1
  }
  if ((vYear % 4 == 0) && (vYear % 100 != 0 || vYear % 400 == 0)) {
    daysInMonth[2] = 29
  }
  if (daysInMonth[vMon] < vDay) {
    vDay = daysInMonth[vMon]
  }
  if (vDay < 10) {
    vDay = '0' + vDay
  }
  if (vMon < 10) {
    vMon = '0' + vMon
  }
  var date = vYear + '-' + vMon + '-' + vDay
  return date
}

/*获取时间差*/
export function getTimeDifference (strDateStart, strDateEnd) {
  var strSeparator = '-' //日期分隔符
  var oDate1
  var oDate2
  var iDays
  oDate1 = strDateStart.split(strSeparator)
  oDate2 = strDateEnd.split(strSeparator)
  var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2])
  var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2])
  iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)//把相差的毫秒数转换为天数
  return iDays
}
/*获取月份差*/
export function getMonthDifference (strDateStart, strDateEnd) {
  var m1 = parseInt(strDateStart.split('-')[1].replace(/^0+/, '')) + parseInt(strDateStart.split('-')[0]) * 12
  var m2 = parseInt(strDateEnd.split('-')[1].replace(/^0+/, '')) + parseInt(strDateEnd.split('-')[0]) * 12
  return m2 - m1
}
