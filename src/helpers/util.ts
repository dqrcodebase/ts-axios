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
