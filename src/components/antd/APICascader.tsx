/*
 * @Author: yejianfei
 * @Date: 2023-04-06 12:12:19
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-17 14:35:08
 * @Description: 
 * @Developer: 
 */
import React, { useEffect, useState } from 'react'
import { Cascader, CascaderProps } from 'antd'

import Api from '../../api'
import { isArray } from 'lodash'

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
  value?: string | string[]
  onChange?: (value: string, selections: any[]) => void
} & CascaderProps<DataNodeType> 

export default function APICascader(props: APICascaderProps) {

  const getValue = () => {
    return props.multiple
      ? (props.value && isArray(props.value) ? (props.value as string[]).reduce((previous: string[][], current:string) => {
        previous.push(current.split('/'))
        return previous
      }, []) : undefined)
      : (props.value && typeof(props.value) === 'string' ? props.value.split('/') : undefined)
  }

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
          console.log('loader', props.value)
          setOptions(data.map((item) => {
              const option = {
                ...item,
                isLeaf: item[props.fieldNames?.leaf || 'leaf'],
                checkable: false
              }

              option[props.fieldNames.children || 'children'] = []
              return option
          }))
        })
    }
  }, [])

  useEffect(() => {
  }, [props.value, options])
  
  const _props = {...props}
  delete (_props as any).cascadeParamName
  return (<Cascader
    {..._props} 
    loadData={loadData} 
    options={options}
    value={getValue()}
    displayRender={props.displayRender || (props.multiple ? (labels: string[], selectedOptions: any) => {

      return  labels.map((label, i) => {
        return <span key={i}>{label} {i < labels.length - 1 ? '/' : ''} </span>
      })
    } : undefined)}
    onChange={(value: any, selections: any[]) => {
      if (props.onChange) {
        const items: any = props.multiple
          ? value.reduce((previous: string[] ,current: string[]) => {
            previous.push(current.join('/'))
            return previous
          }, [])
          : value.join('/')
        
        props.onChange(items, selections)
      }
    }}
  />)
}