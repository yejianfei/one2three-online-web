/*
 * @Author: yejianfei
 * @Date: 2023-04-19 23:29:13
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-22 16:32:42
 * @Description: 
 * @Developer: 
 */
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Button, List, Select, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import Text from '../Text'
import View from '../View'
import APISelect, { APISelectProps } from './APISelect'
import Api from '../../api'

import './APITagListSearchSelect.scss'

const api = Api()

export type APITagListSearchSelect = {
  loader?: string
  value?: string[]
  tags?: string | any[]
  tagFieldNames?: {id?: string, text?: string}
  searchParamName: string
  onChange?: (value: string[]) => void
}


export default function APITagListSearchSelect(props: APITagListSearchSelect) {
  const [tags, setTags] = useState<any[]>([])
  const [selected, setSelected] = useState('')
  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    typeof(props.tags) === 'string'
      ? api.get<any[]>(props.tags).then((data) => setTags(data))
      : setTags(props.tags || [])
  }, [])

  return (
    <View className='ant-list-input' >
      <Select 
        options={options}
        showSearch 
        fieldNames={{
          value: props.tagFieldNames?.id || 'id',
          label: props.tagFieldNames?.text || 'text',
          options: 'items'
        }}
        value={selected}
        filterOption={false}
        onSearch={(value) => {
          if (props.loader && props.searchParamName) {
            const params = {} as any
            params[props.searchParamName] = value
            
            api.get<any[]>(props.loader, {params})
              .then((data) => setOptions(data))
          }
        }}
        onChange={(value) => {
          const tag = options.find((item) => item[props.tagFieldNames ? (props.tagFieldNames.id || 'id') : 'id'] === value)
          if (tag) {
            setTags([tag, ...tags])
          }
       
          setSelected('')
          setOptions([])

          props.onChange && props.onChange([...(props.value || []), value])
        }}
      />
      <List 
        size='small' 
        split={false} 
        dataSource={props.value && tags.filter((item) => (props.value || []).includes(item[props.tagFieldNames ? (props.tagFieldNames.id || 'id') : 'id']))}
        renderItem={(item) => (
          <List.Item>
            <Tag closable onClose={() => {
              props.onChange && props.onChange((props.value || []).filter((value) => {
                return item[props.tagFieldNames ? (props.tagFieldNames.id || 'id') : 'id'] !== value
              }))
            }}>
              <Text style={{width: '100%'}}>{item[props.tagFieldNames ? (props.tagFieldNames.text || 'text') : 'text']}</Text>
            </Tag>
          </List.Item>
        )}
      >
      </List>
    </View>

  )
}