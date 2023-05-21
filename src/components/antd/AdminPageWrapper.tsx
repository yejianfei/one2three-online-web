/*
 * @Author: yejianfei
 * @Date: 2023-04-03 13:55:07
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-05-21 21:53:33
 * @Description: 
 * @Developer: 
 */
import React, { useEffect, useState } from 'react'
import { Avatar, Card, Button, Col, Layout, Menu, Popover, Row, Space, theme, Form, Input } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Header } from 'antd/es/layout/layout'
import { useLocation, Outlet, NavigateFunction } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

import IconFont from '../../icons'
import Api from '../../api'
import View from '../View'
import Text from '../Text'
import Image from '../Image'
import APIFormModal from './APIFormModal'

const api = Api()

type Props = {
  route: {
		navigate: NavigateFunction
		params: Readonly<{platform: string}>
	}
}

export default function AdminPageWrapper(props: Props) {
  const [changePassword, setChangePassword] = useState(false)
  const location = useLocation()
  const { token: { colorBgContainer }} = theme.useToken()
  const t = theme.useToken()
  const [menus, setMenus] = useState([])
  useEffect(() => {
    api.get<never[]>('../json/menus.json')
    .then((res) => setMenus(res))
  }, [])
  return (
    <>
      <Layout style={{height: '100%'}}>
        <Header style={{paddingInline: 16}}>
        <Row align='middle'>
          <Col  flex={1}>
            <Space size={24}>
              <Image style={{height: 32, marginTop: 16}} src='/images/logo-white.png' />
              <Text style={{color:'#ffffff', fontSize: 24, fontWeight: 500}}>万图随预约随访运营系统</Text>
            </Space>
          </Col>
          <Col>
            <Popover content={(
              <Card 
                style={{boxShadow: 'none'}}
                size='small'
                bordered={false}
                actions={[
                  <Button size='small' type='link' danger onClick={() => setChangePassword(true)}>修改密码</Button>,
                  <Button 
                    size='small' 
                    type='link' 
                    onClick={() => {
                      api.token = null
                      props.route.navigate('/login')
                    }}>
                      退出登录
                    </Button>
                ]}
              >
                <View style={{width: '100%', fontSize: 14, textAlign: 'center'}}>
                  <Text>管理员</Text>
                </View>
              </Card>
            )}>
            <Avatar size="large" icon={<UserOutlined />} />
            </Popover>
          </Col>
        </Row>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              selectedKeys={[(menus.find((item:any) => item.path === location.pathname) as any)?.key]}
              items={menus.map(
                (item: any) => {
                  return {
                    key: item.key,
                    icon: <IconFont type={item.icon} />,
                    label: item.label,
                    onClick: () => props.route.navigate(item.path)
                  }
                },
              )}
            />
          </Sider>
          <Layout style={{ padding: '0 12px 12px'}}>
            <Outlet />
          </Layout>
        </Layout>
      </Layout>
      <APIFormModal
        open={changePassword}
        afterClose={() => setChangePassword(false)}
        title='修改密码'
        form={{
          labelCol: {span: 4}
        }}
      >
        <Form.Item name="old_password" label="旧密码" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="old_password" label="新密码" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="old_password" label="密码确认" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
      </APIFormModal>
    </>
  )
}