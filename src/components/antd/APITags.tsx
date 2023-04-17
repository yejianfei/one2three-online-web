/*
 * @Author: yejianfei
 * @Date: 2023-04-11 15:42:35
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-17 09:53:18
 * @Description: 
 * @Developer: 
 */
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Input, InputRef, Tag, theme } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

type InputTagProps = {
  value?: string[]
  placeholder?: string
  onChange?: (value: string[]) => void
}

export default function InputTags(props: InputTagProps) {
  const { token } = theme.useToken()
  const inputRef = useRef<InputRef>(null);
  const editRef  =  useRef<InputRef>(null);
  const [editing, setEditing] = useState<number | undefined>(undefined)
  const [adding, setAdding] = useState(false)
  const [newValue, setNewValue] = useState<string>('')

  useEffect(() => inputRef.current?.focus(), [adding])
  useEffect(() => editRef.current?.focus(), [editing])

  return (
    <>
      {(props.value || []).map((item, index) => (
        editing === index
          ? (
            <Input
              ref={editRef}
              key={index}
              size="small"
              style={{
                width: 78,
                verticalAlign: 'top',
              }}
              value={item}
              // onChange={handleEditInputChange}
              // onBlur={handleEditInputConfirm}
              // onPressEnter={handleEditInputConfirm}
            />
          )

          : (
            <Tag 
              key={index} 
              closable
              children={item}
              onDoubleClick={() => {
                setEditing(index)
              }}
            />
          )
        // {editing === index 
        //   ? (<></>)
        //   : (<></>)
        // }

      ))}
      {adding 
        ?
          <Input 
            ref={inputRef} 
            size='small' 
            style={{ width: 78, verticalAlign: 'top',}}
            value={newValue}
            onChange={(value) => setNewValue(value.target.value)}
            onBlur={() => {
              props.onChange && props.onChange([...(props.value || []), newValue])
            }}
          />
        : (
          <Tag 
            onClick={() => {
              setAdding(true)
              setNewValue('')
            }}
            style={{ background: token.colorBgContainer, borderStyle: 'dashed'}}
          >
            <PlusOutlined /> {props.placeholder || '新增'}
          </Tag>
        )
      }

      
    </>
  )
}
