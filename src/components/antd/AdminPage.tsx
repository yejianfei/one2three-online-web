/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:42:35
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-11 15:09:49
 * @Description: 
 * @Developer: 
 */
import { Breadcrumb, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { Fragment } from 'react'


type AdminPageProps = {
  children: any
}

export default function AdminPage(props: AdminPageProps) {
  const { token: { colorBgContainer }} = theme.useToken()
  return (
    <Fragment>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
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