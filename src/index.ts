import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { processHeaders } from './helpers/headers'
function axios(config: AxiosRequestConfig) {
  processConfig(config)
  // TODO
  xhr(config)
}
function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  config.data = transformHeader(config)
}
function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildURL(url, params)
}
function transformHeader(config: AxiosRequestConfig) {
  const { headers, data } = config
  return processHeaders(headers, data)
}
export default axios
