const toString = Object.prototype.toString

export function isObject(val: any) {
  return val !== null && typeof val === 'object'
}
export function isDate(val: any) {
  return toString.call(val) === '[object, Date]'
}
export function isPlainObject(data: any) {
  return toString.call(data) === '[object Object]'
}
export function isPlainArray(data: any) {
  return toString.call(data) === '[object Array]'
}

export function parseHeaders(headers: string): object {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
