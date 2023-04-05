/*
 * @Author: yejianfei
 * @Date: 2023-04-03 13:55:07
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-03 22:43:42
 * @Description: 
 * @Developer: 
 */
import React, { useEffect, useState } from 'react'
import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { BrowserRouter as Router, Routes, useLocation, Link, Outlet, NavigateFunction} from 'react-router-dom'

// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import * as icons from'@ant-design/icons'
import IconFont from '../../icons'
import Api from '../../api'

const api = Api()

type Props = {
  route: {
		navigate: NavigateFunction
		params: Readonly<{platform: string}>
	}
}

export default function AdminPageWrapper(props: Props) {
  const location = useLocation()
  const { token: { colorBgContainer }} = theme.useToken()
  const [menus, setMenus] = useState([])
  useEffect(() => {
    api.get<never[]>('http://localhost:8088/json/menus.json')
    .then((res) => setMenus(res))
  }, [])
  return (
    <Layout style={{height: '100%'}}>
      <Header>

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
        <Layout style={{ padding: '0 12px 12px' }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}