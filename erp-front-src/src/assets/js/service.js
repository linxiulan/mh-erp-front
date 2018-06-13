/**
 * Created by linxiulan on 2018/4/22.
 */
import axios from 'axios'
import { getCookie, getLocalStorage, setLocalStorage } from './common'
import { serviceApi } from './serviceApi'
import router from '../../router'
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://api.mherp.com'
axios.interceptors.request.use(
  config => {
    let _type='text/plain;charset=UTF-8';
    const token = getCookie('token');
    if(config.url=='/api/file/temp/upload'){
      _type='multipart/form-data'
    }else{
      config.data = JSON.stringify(config.data)
    }
    config.headers = {
      'Content-Type': _type
    }
    if (token) {
      if (config.params) {
        config.params.AccessToken = token
      } else {
        config.params = {'AccessToken': token}
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code == 'INVALID_TOKEN') {
      router.push({
        path: '/user/login',
        querry: {redirect: router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
/*获取站点列表*/
export function getStation (id, callback) {
  get(serviceApi.stationList).then(res => {
    if (res.code == 'SUCCESS') {
      let _data = res.data,
        _name = ''
      setLocalStorage('stationListData', _data)
      for (let i = 0; i < _data.length; i++) {
        let item = _data[i]
        if (item.stationId == id) {
          _name = item.name
          break
        }
      }
      if (callback) {
        callback(_name)
      } else {
        return _name
      }
    }
  })
}
/*获取站点名*/
export function getStationName (id, callback) {
  if (id == '') {
    return ''
  }
  let stationListData = getLocalStorage('stationListData')
  if (stationListData) {
    let _name = ''
    for (let i = 0; i < stationListData.length; i++) {
      let item = stationListData[i]
      if (item.stationId == id) {
        _name = item.name
        break
      }
    }
    return _name
  } else {
    getStation(id, callback)
  }
}
