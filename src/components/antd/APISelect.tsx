/*
 * @Author: yejianfei
 * @Date: 2023-04-06 12:12:19
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-06 15:45:45
 * @Description: 
 * @Developer: 
 */
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Select, SelectProps } from 'antd'

import Api from '../../api'

const api = Api()

type APISelectProps = {
  stringify?: boolean
  loader?: string | {id: string, name: string}[]
  params?: {[key: string]: any}
} & SelectProps<any, any>

export default function APISelect(props: APISelectProps) {
  const [options, setOptions] = useState<any[] | undefined>(props.options)

  useEffect(() => {
    if (props.loader) {
      typeof(props.loader) === 'string' ? 
      api.get<any[]>(props.loader, {params: props.params})
      .then((data) => {
        setOptions(data)
      }) : {}
    }
  }, [])
  
  const allOptions = {...props, value: props.value, onChange: props.onChange, options: props.loader ? options : props.options}

  delete (allOptions as any).stringify
  return (
    <Select { ...allOptions } />
  )
}