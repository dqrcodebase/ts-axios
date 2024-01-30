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

// extend 方法的实现用到了交叉类型，并且用到了类型断言。
// extend 的最终目的是把 from 里的属性都扩展到 to 中，包括原型上的属性。
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
