/*
 * @Author: yejianfei
 * @Date: 2022-05-26 13:54:33
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-11 13:57:43
 * @Description: 
 * @Developer: 
 */
import React from 'react'
import LoginPage from './pages/LoginPage'
import AdminHomePage from './pages/admin/HomePage'
import AdminUserLIstPage from './pages/admin/UserListPage'
import AdminDiagnosticListPage from './pages/admin/DiagnosticListPage'
import AdminHospitalListPage from './pages/admin/HospitalListPage'
import AdminDepartmentListPage from './pages/admin/DepartmentListPage'
import AdminQuestionListPage from './pages/admin/QuestionListPage'
import AdminQuestionFormPage from './pages/admin/QuestionFormPage'

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
      },{
        path: "diagnosis",
        component: AdminDiagnosticListPage,
        isExact: true,
        meta: {
          title: '诊疗项目'
        }
      },{
        path: "hospitals",
        component: AdminHospitalListPage,
        isExact: true,
        meta: {
          title: '医院管理'
        }
      },{
        path: "departments",
        component: AdminDepartmentListPage,
        isExact: true,
        meta: {
          title: '科室管理'
        }
      }, {
        path: "questions",
        component: AdminQuestionListPage,
        isExact: true,
        meta: {
          title: '问卷管理'
        }
      }, {
        path: "questions/form",
        component: AdminQuestionFormPage,
        isExact: true,
        meta: {
          title: '新增问题'
        }
      }
    ]
  }
]