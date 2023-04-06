/*
 * @Author: yejianfei
 * @Date: 2023-04-06 12:12:19
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-06 15:45:45
 * @Description: 
 * @Developer: 
 */
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Cascader, CascaderProps } from 'antd'

import Api from '../../api'

const api = Api()

type APICascaderProps<DataNodeType = any> = {
  loader?: string | {root: string, children: string}
  params?: {[key: string]: any}
  depth?: number
  cascadeParamName?: string
  fieldNames: {
    label?: string
    value?: string
    children?: string
    leaf?: string
    path?: string
  }
  value?: string
  onChange?: (value: string, selections: any[]) => void
} & CascaderProps<DataNodeType> 

export default function APICascader(props: APICascaderProps) {
  const [options, setOptions] = useState<any[] | undefined>(props.options)
  const loadData = props.loader
    ? (selections: any[]) => {
      if (props.loader && selections.length) {
        const url = typeof(props.loader) === 'string'
          ? props.loader : props.loader.children

        const option = selections[selections.length - 1]
        option.loading = true

        const path = {} as any
        path[props.cascadeParamName || 'path'] = option[props.fieldNames.path || 'path']
        api.get<any[]>(url, {params: {...(props.params || {}), ...path}})
          .then((data) => {
            option.loading = false
            option[props.fieldNames.children || 'children'] = data.map((item) => ({
              ...item,
              isLeaf: props.depth && props.depth === selections.length - 1 
                ? item[props.fieldNames?.leaf || 'leaf']
                : true
            }))

            setOptions([...(options || [])])
            
          })
      }
    }
    : props.loadData

  useEffect(() => {
    if (props.loader) {
      const url = typeof(props.loader) === 'string'
        ? props.loader : props.loader.root
      api.get<any[]>(url, {params: props.params})
        .then((data) => {
          setOptions(data.map((item) => {
              const option = {
                ...item,
                isLeaf: item[props.fieldNames?.leaf || 'leaf']
              }

              option[props.fieldNames.children || 'children'] = []
              return option
          }))
        })
    }
  }, [])

  const value = props.value && props.value.split('/')
  const _props = {...props}
  delete (_props as any).cascadeParamName
  return (<Cascader
    {..._props} 
    loadData={loadData} 
    options={options}
    value={value}
    onChange={(value: any[], selections: any[]) => {
      props.onChange && props.onChange(value.join('/'), selections)
    }}
  />)
}