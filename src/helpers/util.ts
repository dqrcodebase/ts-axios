const toString = Object.prototype.toString

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object, Date]'
}
export function isPlainObject(data: any): Boolean {
  return toString.call(data) === '[object, Object]'
}
