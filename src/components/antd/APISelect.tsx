/*
 * @Author: yejianfei
 * @Date: 2023-04-06 12:12:19
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-22 15:19:17
 * @Description: 
 * @Developer: 
 */
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Select, SelectProps } from 'antd'

import Api from '../../api'

const api = Api()

export type APISelectProps = {
  loader?: string
  params?: {[key: string]: any}
  searchParamName?: string
} & SelectProps<any, any>

export default function APISelect(props: APISelectProps) {
  const [options, setOptions] = useState<any[] | undefined>(props.options)

  useEffect(() => {
    if (props.loader) {
      api.get<any[]>(props.loader, {params: props.params})
        .then((data) => setOptions(data))
    }
  }, [])

  const onSearch = (value: string) => {
    if (props.loader && props.searchParamName) {
      const params = {...(props.params || {})} 
      params[props.searchParamName] = value
      api.get<any[]>(props.loader, {params})
        .then((data) => setOptions(data))
    } else {
      props.onSearch && props.onSearch(value)
    }
  }

  const attributes = { ...props, onSearch, options }
  delete (attributes as any).searchParamName

  return (
    <Select {...attributes} filterOption={props.filterOption || !props.showSearch} />
  )
}