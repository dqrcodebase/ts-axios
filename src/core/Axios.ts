import { AxiosRequestConfig, AxiosPromise } from '../types'
import dispatchRequest from './dispatchRequest'
export default class Axios {
  request(url: any, config?: any): AxiosPromise {
    // 我们判断 url 是否为字符串类型，一旦它为字符串类型，则继续对 config 判断，
    // 因为它可能不传，如果为空则构造一个空对象，然后把 url 添加到 config.url 中。
    // 如果 url 不是字符串类型，则说明我们传入的就是单个参数，
    // 且 url 就是 config，因此把 url 赋值给 config
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  _requestMethodWithoutData(method: string, url: string, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { url, method }))
  }
  _requestMethodWithData(method: string, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { url, method, data }))
  }
}
