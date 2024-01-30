import { isDate, isObject } from './util'

function encode(val: string): string {
  console.log('🚀 ~ encode ~ val:', val, encodeURIComponent(val))
  // 为了避免服务器收到不可预知的请求，
  // 对任何用户输入的作为 URI 部分的内容你都需要用 encodeURIComponent 进行转义
  // encodeURIComponent不转义的字符： A-Z a-z 0-9 - _ . ! ~ * ' ( )
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url?: string, params?: any) {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || val === undefined) {
      return
    }
    let values: any[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
