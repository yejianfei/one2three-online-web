/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:42:35
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-28 14:03:58
 * @Description: 
 * @Developer: 
 */
import { Breadcrumb, Button, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'


type AdminPageProps = {
  breadcrumbs?: {label: string, url: string}[]
  children: any
}

export default function AdminPage(props: AdminPageProps) {
  const { token: { colorBgContainer }} = theme.useToken()
  const navigate = useNavigate()
  return (
    <Fragment>
    <Breadcrumb style={{ margin: '16px 0' }}>
      {props.breadcrumbs?.map((item, index) => (
        <Breadcrumb.Item key={index} onClick={() => navigate(item.url)}>
          <Button type='text' size='small'>{item.label}</Button>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
    <Content
      style={{
        // padding: 12,
        margin: 0,
        height: '100%',
        overflow: 'scroll' 
        // background: colorBgContainer,
      }}
    >
      {props.children}
    </Content>
  </Fragment>
  )
}