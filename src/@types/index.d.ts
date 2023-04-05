/*
 * @Author: yejianfei
 * @Date: 2022-05-26 14:29:41
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-03 10:20:32
 * @Description: 
 * @Developer: 
 */
declare module "*.png"

declare const CONFIG: {
  http: any,
  api: {
    base: string,
    timeout: number,
    headers: {},
    crossdomain: boolean,
    baseURL: string,
    sourceUrl: string
  }
}

declare type PageResult<D> = {
  count: number
  list: D[]
}