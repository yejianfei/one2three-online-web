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
import { filter, forIn, isArray } from 'lodash'

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

  const indexOf = (value: string, search: string, index: number) => {
    let idx = value.indexOf(search)
    if (index === 1) {
        return idx;
    }

    for (let i = 1; i < index; i += 1) {
      idx = value.indexOf(search, idx + 1);
    }

    return idx;
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
              isLeaf: props.depth && props.depth - 1 !== selections.length 
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
    if (options && props.value && props.loader) {
      const url = typeof(props.loader) === 'string' ? props.loader : props.loader.children

      const value = typeof(props.value) === 'string' ? props.value : ''

      const paths = new Array(props.depth || 0).fill({})
        .filter((item: any, index: number) => index + 1 != props.depth)
        .map((item: any, index: number) => value.substring(0, indexOf(value, '/', index + 1)))

      Promise
        .all(paths.map((item) =>
          api.get<any[]>(url, {
            params: { ...(props.params || {}), ...{path: item} }
          })
        ))
        .then(([departments, items]) => {
          const departmentOptions = departments.map(element => {

            element[props.fieldNames.children || 'children'] = items ? items
              .filter(item => item.parent_id === element.id)
              .map((item: any, index: number) => ({
                ...item,
                isLeaf: props.depth && props.depth !== index
                  ? item[props.fieldNames?.leaf || 'leaf']
                  : true
              })) : []

            return element
          })

          setOptions(options.map((item) => {
            const option = {
              ...item,
              isLeaf: item[props.fieldNames?.leaf || 'leaf'],
              checkable: false
            }

            option[props.fieldNames.children || 'children'] = departmentOptions.filter(department => department.parent_id === item.id)
            return option
          }))
        })
    }

  }, [props.value])
  
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