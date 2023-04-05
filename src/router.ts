/*
 * @Author: yejianfei
 * @Date: 2022-05-26 13:54:33
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-03 22:36:44
 * @Description: 
 * @Developer: 
 */
import React from 'react'
import LoginPage from './pages/LoginPage'
import AdminHomePage from './pages/admin/HomePage'
import AdminUserLIstPage from './pages/admin/UserListPage'

export default [
  {
  path: "/login",
  component: LoginPage,
  isExact: true,
  meta: {
    title: '登录'
  }
  },
  {
    path: "/admin",
    component: React.lazy(() => import('./components/antd/AdminPageWrapper')),
    meta: {
      title: '首页'
    },
    chidren: [
      {
        path: "home",
        component: AdminHomePage,
        isExact: true,
        meta: {
          title: '首页'
        }
      },{
        path: "users",
        component: AdminUserLIstPage,
        isExact: true,
        meta: {
          title: '运营账号'
        }
      }
    ]
  }
]