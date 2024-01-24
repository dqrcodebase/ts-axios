import { isPlainObject, isPlainArray } from './util'

export function transformRequest(data: any) {
  // 对于 FormData、ArrayBuffer 这些类型，isObject 判断也为 true，
  // 但是这些类型的数据我们是不需要做处理的，
  // 而 isPlainObject 的判断方式，只有我们定义的普通 JSON 对象才能满足。
  if (isPlainObject(data) || isPlainArray(data)) {
    return JSON.stringify(data)
  }
  return data
}
