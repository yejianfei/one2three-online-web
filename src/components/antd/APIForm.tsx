/*
 * @Author: yejianfei
 * @Date: 2022-05-28 15:26:23
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-05 14:40:13
 * @Description: 
 * @Developer: 
 */
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Form, FormProps } from 'antd'
import Api from '../../api'
import type { FormInstance } from 'antd/es/form';
import { cloneDeep, cloneDeepWith, merge } from 'lodash';

export type APIFormProps<Values = any> = {
  ref?: any
  value?: string
  idProp?: string
  action?: string
  loader?: string
  onBeforeLoad?: (value: string) => Promise<any>
  onBeforeRequest?: (method: 'post' | 'put', values: Values) => (Values | false) | Promise<Values | false>
  onRequestSucceeded?: <R = any>(method: 'post' | 'put', res: R, values: Values) => void
  onRequestFailed?: (method: 'post' | 'put', error: Error, values: Values,) => void
} & FormProps<Values>

const api = Api()

export default forwardRef((props: APIFormProps<any>, formRef: any) => {
  useEffect(() => {
    if (props.value && props.loader) {
      const loader = props.loader
      const before = props.onBeforeLoad || (() => {})

      Promise
        .resolve(before(props.value))
        .then((res) => {
          const params:any = {...(res || {})}
          params[props.idProp || 'id'] = props.value
          
          return api.get(loader, {params})
        })
        .then((data: any) => {
          console.log(data)
          formRef.current?.setFieldsValue(data)
        })
    }
   
  }, [props.value])
  
  const onFinish = props.onFinish || ((values: any) => {
    const method = values[props.idProp || 'id'] || props.value ? 'put' : 'post'
    const succeeded = props.onRequestSucceeded || (() => {})
    const failed = props.onRequestFailed || (() => {})
    const request = (method: 'post' | 'put', values: any):Promise<any> => {
      const id = {} as any
      if (props.value) {
        id[props.idProp || 'id'] = props.value
      }

      const payload = {
        ...id,
        ...merge(cloneDeep(props.initialValues), cloneDeep(values))
      }
      if (props.action) {
        return method == 'post' ? api.post(props.action, payload) : api.put(props.action, {...payload})
      } else {
        return Promise.resolve()
      }
    }
    Promise
      .resolve((props.onBeforeRequest || ((_method, v: any) => v))(method, values))
      .then((v: any) =>  v !== false ? request(method, v) : Promise.resolve())
      .then((res) => succeeded(method, res, values))
      .catch((error) => failed(method, error, values))
  })
  
  const options = { ...props, onFinish }
  delete (options as any).idProp
  delete (options as any).action
  delete (options as any).onBeforeRequest
  delete (options as any).onRequestSucceeded
  delete (options as any).onRequestFailed
  
  return <Form ref={formRef} { ...options as any } />
})