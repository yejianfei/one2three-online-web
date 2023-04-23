/*
 * @Author: yejianfei
 * @Date: 2022-05-26 13:54:33
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-19 22:58:09
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
import AdminQuestionnaireListPage from './pages/admin/QuestionnaireListPage'
import AdminQuestionnaireFormPage from './pages/admin/QuestionnaireFormPage'
import AdminQuestionListPage from './pages/admin/QuestionListPage'
import AdminQuestionFormPage from './pages/admin/QuestionFormPage'
import AdminHospotalUserListPage from './pages/admin/HospotalUserListPage'

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
        path: "questionnaires",
        component: AdminQuestionnaireListPage,
        isExact: true,
        meta: {
          title: '问卷管理'
        }
      }, {
        path: "questionnaires/form/",
        component: AdminQuestionnaireFormPage,
        isExact: true,
        meta: {
          title: '问卷资料'
        }
      }, {
        path: "questionnaires/form/:id",
        component: AdminQuestionnaireFormPage,
        isExact: true,
        meta: {
          title: '问卷资料'
        }
      }, {
        path: "questions",
        component: AdminQuestionListPage,
        isExact: true,
        meta: {
          title: '问题管理'
        }
      }, {
        path: "questions/form",
        component: AdminQuestionFormPage,
        isExact: true,
        meta: {
          title: '问题列表'
        }
      },{
        path: "doctors",
        component: AdminHospotalUserListPage,
        isExact: true,
        meta: {
          title: '医护人员'
        }
      }
    ]
  }
]