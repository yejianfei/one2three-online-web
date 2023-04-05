/*
 * @Author: yejianfei
 * @Date: 2020-04-21 15:54:08
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-05 11:50:52
 * @Description: 
 * @Developer: 
 */
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import qs from 'qs'
import EventEmitter from 'eventemitter3'
import cookies from 'browser-cookies'
import jwt from 'jwt-decode'
import moment from 'moment-timezone'
import { isArray } from 'lodash'


type JwtInfo = {
  id: string
  exp: string
  iat: string
  iss: string
  extras: {
    name: string
    role: string
    org_id: string
    group_id: string
  }
}

const emitter = new EventEmitter()
const http = Axios.create(Object.assign({
  // paramsSerializer: (params:any) => {
  //   console.log(params)
  //   return qs.stringify(params, {
  //     arrayFormat: 'repeat',
  //     serializeDate: (date: Date) => moment.tz(date, 'utc').format()
  //   })
  // }
},CONFIG.http))

let authorization: string | null = cookies.get('Authorization')

http.interceptors.request.use(async (config) => {
  if (authorization) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: authorization
    } as any
  }
  return config
}, (error) => error)

http.interceptors.response.use((response) => {
  if (response.headers.authorization) {
    authorization = response.headers.authorization
    authorization && cookies.set('Authorization', authorization)
  }

  let contenttype = response.headers['content-type'] as string
  if (contenttype && contenttype.startsWith('application/json')) {
    const rs = response.data as {success: boolean, data: any, code:number, msg: string}
    if (!rs.success) {
      return Promise.reject(rs.code)
    }
    return Promise.resolve(rs.data)
  }
  return response
}, (error) => {
  emitter.emit('response-error', error, error?.response?.status, error?.response)
  return Promise.reject(error)
})


function buildUrl(url: string, config?: AxiosRequestConfig): [string, AxiosRequestConfig | undefined] {
  if (!config) {
    return [url, {}]
  }

  const o = Object.assign(Object.assign({}, config), {
    params: Object.assign({}, config.params),
    data: isArray(config.data) ? config.data : Object.assign({}, config.data)
  })

  if (!o.params) return [url, config]

  const list = url.match(/:\w+/g) || []
  for (let item of list) {
    const value = o.params ? o.params[item.substring(1)] : undefined
    url = url.replace(item,  value !== undefined ? value.toString(): item)
    delete o.params[item.substring(1)]
  }
  return [url, o]
}

export class GenericHttpInstance {

  constructor(private instance: AxiosInstance, private uri?: string) {}

  list<T>(keywords: string, page: number, size: number = 25): Promise<{count: number, list: T[]}> {
    return this.instance.get(`${this.uri}/list/${page}?size=${size}&keywords=${keywords}`)
  }

  load<T> (id: string): Promise<T> {
    return this.instance.get(`${this.uri}/${id}`)
  }

  save<T>(data: T): Promise<string> {
    return this.instance.post(`${this.uri}`, data)
  }

  update<T>(data: T): Promise<number> {
    return this.instance.put(`${this.uri}`, data)
  }

  status(status: number, id: string[]): Promise<number> {
    return this.instance.put(`${this.uri}/${status}`, id)
  }

  remove(id: string[]): Promise<number> {
    return this.instance.delete(`${this.uri}`)
  }

  request<T> (config: AxiosRequestConfig): Promise<T> {
    if (!config.url) {
      return Promise.reject();
    }
    
    let [url, conf] =  buildUrl(config.url, config)
    if (!conf) {
      return Promise.reject();
    }

    conf.url = url
    return this.instance.request(conf)
  }
  
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(...buildUrl(`${this.uri || ''}${url}`, config))
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(...buildUrl(url, config))
  }

  head<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.head(url, config)
  }

  options<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.options(url, config)
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const [url2, config2] = buildUrl(url, config)
    return this.instance.post(url2, data, config2)
  }
  
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const [url2, config2] = buildUrl(url, config)
    return this.instance.put(url2, data, config2)
  }

  upload<T>(url: string, file: Blob, data?: {[key: string]: string}): Promise<T> {
    const form = new FormData()
    data && Object.entries(data).forEach(([key, value]) => {
      form.append(key, value)
    })

    form.append('file', file)
    return this.instance.post(url, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config)
  }

  emit(event: string, ...args: any[]): this {
    emitter.emit(event, ...args)
    return this
  }

  on(event: string, fn: (...args: any[]) => void, context?: any): this {
    emitter.on(event, fn, context)
    return this
  }

  off(event: string, fn: (...args: any[]) => void, context?: any, once?: boolean):this {
    emitter.off(event, fn, context, once)
    return this
  }

  get jwt(): JwtInfo | null  {
    return authorization ? (jwt(authorization) as JwtInfo) : null
  }

  set token(token: string | null) {
    authorization = token
  }

  get token(): string | null {
    return authorization
  }
}

export default function(uri?: string) {
  return new GenericHttpInstance(http, uri);
}

export type ApiPageResult<T> = {
  count: number,
  list: T[]
}

