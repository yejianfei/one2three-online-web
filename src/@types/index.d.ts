/*
 * @Author: yejianfei
 * @Date: 2022-05-26 14:29:41
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-05-21 22:02:12
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

declare const ENV: {
  application: {
    name: string
    version: string
  }
}

declare type PageResult<D> = {
  count: number
  list: D[]
}