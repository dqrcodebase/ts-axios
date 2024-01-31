import { AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { processHeaders } from '../helpers/headers'
import { transformRequest, transformResponse } from '../helpers/data'
function axios(config: AxiosRequestConfig) {
  processConfig(config)
  // TODO
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  // 一定要先执行transformHeader之后再执行transformRequestData
  // 因为transformRequestData内部使用的header都是标准化的
  config.headers = transformHeader(config)
  config.data = transformRequestData(config)
}
function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildURL(url, params)
}
function transformHeader(config: AxiosRequestConfig) {
  const { headers, data } = config
  return processHeaders(headers, data)
}
function transformRequestData(config: AxiosRequestConfig) {
  const { data } = config
  return transformRequest(data)
}
function transformResponseData(response: AxiosResponse) {
  response.data = transformResponse(response.data)
  return response
}
export default axios
