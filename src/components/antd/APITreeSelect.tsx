/*
 * @Author: yejianfei
 * @Date: 2023-04-17 14:23:28
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-05-24 16:32:41
 * @Description: 
 * @Developer: 
 */
import React, { useEffect, useState } from 'react'
import { Tag, TreeSelect, TreeSelectProps } from 'antd'
import Api from '../../api'
import { isArray } from 'lodash'

const api = Api()

type APITreeSelectProps = {
  loader?: string | {root: string, children: string}
  params?: {[key: string]: any}
  depth?: number
  leafSelectableOnly?: boolean
  leafCheckableOnly?: boolean
} & TreeSelectProps

export default function APITreeSelect(props: APITreeSelectProps) {
  const [data, setData] = useState<any[]>([])
  const loadData = props.loader ? async (node: any) => {
    if (props.loader) {
      const url = typeof(props.loader) === 'string'
        ? props.loader : props.loader.children

      const res = (await api.get<any[]>(url, {params: {...(props.params || {}), ...{path: node.full_path}}}))
      setData((current) => {
        return [...current, ...res.filter((item) => !current.find((node) => node.full_path === item.full_path)).map((item) => {
          const leaf = props.depth && props.depth <= item.full_path.split('/').length || item.leaf
          return {
            key: item.full_path,
            value: item.full_path,
            title: item.name,
            ...item,
            pId: item.parent_id,
            isLeaf: leaf,
            checkable: !props.leafCheckableOnly || leaf,
            selectable: !props.leafSelectableOnly || leaf,
          }
        })]
      })
    }
  } : undefined

  useEffect(() => {
    if (props.loader) {
      const url = typeof(props.loader) === 'string'
        ? props.loader : props.loader.root

      api.get<any[]>(url, {params: props.params})
        .then((data) => {
          setData(data.map((item) => {
            const leaf = props.depth && props.depth <= item.full_path.split('/').length || item.leaf
            return {
              key: item.full_path,
              value: item.full_path,
              title: item.name,
              isLeaf: leaf,
              checkable: !props.leafCheckableOnly || leaf,
              selectable: !props.leafSelectableOnly || leaf,
              pId: 0,
              ...item,
              
            }
          }))
        })
    }
  }, [])


  useEffect(() => {
    if (props.value && props.loader) {
      const values = (isArray(props.value) ? props.value : [props.value])
        .filter((item) => {
          return !data.find((node) => node.full_path === item)
        })

        const url = typeof(props.loader) === 'string'
          ? props.loader : props.loader.children

        Promise
          .all( values.map((item) =>
            api.get(url, {
              params: {...(props.params || {}), 
              ...{path: item.substring(0, item.lastIndexOf('/'))}
              }
            })
          ))
          .then((children) => {
            setData((current) => {
              return  [...current, ...children
                .flat()
                .filter((item: any, index, array) => {
                  return array.findIndex((element: any) => element.id === item.id) === index
                })
                .map((item: any) => {
                  const leaf = props.depth && props.depth <= item.full_path.split('/').length || item.leaf
                  return {
                    key: item.full_path,
                    value: item.full_path,
                    title: item.name,
                    ...item,
                    pId: item.parent_id,
                    isLeaf: leaf,
                    checkable: !props.leafCheckableOnly || leaf,
                    selectable: !props.leafSelectableOnly || leaf,
                  }
                })]
            })
          })
    }
  }, [props.value])


  const attributes = { ...props }
  delete (attributes as any).leafSelectableOnly
  delete (attributes as any).leafCheckableOnly

  return (
    <TreeSelect 
      {...attributes}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      tagRender={(props: any) => {
        const items = props.value.split('/')
        return (
          <Tag 
            key={props.value}
            {...props} 
            className='ant-select-selection-item' 
            children={data.filter((node) => items.includes(node.id)).map((node) => node.name).join('/')} 
          />
        )
      }}
      treeDataSimpleMode
      loadData={loadData}
      treeData={data}
    />
  )
}