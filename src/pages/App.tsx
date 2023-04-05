/*
 * @Author: yejianfei
 * @Date: 2023-04-03 10:11:24
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-05 13:14:37
 * @Description: 
 * @Developer: 
 */
import React, { Fragment, Suspense } from 'react'
import {createRoot} from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { App, ConfigProvider } from 'antd'

import routers from '../router'

import '../assets/app.scss'


function WithRoutePage(props: {page: React.ComponentType<any>}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const route = {
    navigate: useNavigate(),
    params: useParams(),
    searchParams: searchParams
  }

  return <props.page route={route}></props.page>
}

function MyApp() {
  return (
    <ConfigProvider>
      <App>
        <Router>
          <Suspense>
            <Routes>
              {
                routers.map((item:any) =>  (
                  <Route path={item.path} key={item.path} element={<WithRoutePage page={item.component} />}>
                    { item.chidren?.map((child:any) => <Route path={child.path} key={child.path} element={<WithRoutePage page={child.component} />} />)}
                  </Route>
                ))
              }
            </Routes>
          </Suspense>
        </Router>
      </App>
    </ConfigProvider>
  )
}

createRoot(document.getElementById('app') as HTMLElement).render(<MyApp />)