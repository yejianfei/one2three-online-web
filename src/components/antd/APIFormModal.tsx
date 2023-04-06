/*
 * @Author: yejianfei
 * @Date: 2023-04-04 20:58:29
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-06 12:15:15
 * @Description: 
 * @Developer: 
 */
import { FormInstance, Modal, ModalProps } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import APIForm, { APIFormProps } from './APIForm'
import Separator from '../Separator'

type APIFormModalProps<Values extends object = any> = {
  form: APIFormProps<Values>
} & ModalProps

export default function (props: APIFormModalProps) {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isOpened, setOpened] = useState<boolean | undefined>(false)
  const form = useRef<FormInstance<any>>(null)

  useEffect(() => {
    setOpened(props.open)
  }, [props.open])
  return (
    <Modal 
      {...props}
      open={isOpened}
      destroyOnClose
      // forceRender
      confirmLoading={isLoading}
      okText='确定'
      cancelText='取消'
      onOk={() => form.current?.submit()}
      onCancel={() => setOpened(false)}
    >
      <Separator size={12} />
      <APIForm 
        ref={form}
        {...props.form}
        onBeforeRequest={(method, values) => {
          setLoading(true)
          return props.form.onBeforeRequest 
            ? props.form.onBeforeRequest(method, values)
            : values
        }}
        onRequestSucceeded={(method, res, values) => {
          props.form.onRequestSucceeded && props.form.onRequestSucceeded(method, res, values)
          setLoading(false)
          setOpened(false)
        }}
      >
        {props.children}
      </APIForm>
    </Modal>
  )
}