/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:42:35
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-03 23:07:09
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
        // background: colorBgContainer,
      }}
    >
      {props.children}
    </Content>
  </Fragment>
  )
}