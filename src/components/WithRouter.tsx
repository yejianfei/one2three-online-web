/*
 * @Author: yejianfei
 * @Date: 2022-06-19 14:17:25
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-04 20:48:40
 * @Description: 
 * @Developer: 
 */
import React, { useEffect, useState } from 'react'
import { App, AppProps, message } from 'antd'
import { NavigateFunction, Params, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAppProps } from 'antd/es/app/context'
import { ArgsProps } from 'antd/es/message'

export type RouteAttribute<P extends Params<string>> = {
  navigate: NavigateFunction
  params: Readonly<P>
  searchParams: URLSearchParams
}

type WithRouterOptions<P extends Params<string>> = {
  onBeforeEnter?: (route: RouteAttribute<P>, app: useAppProps) => Promise<any>
}


export type WithRouteAttributeProps<P extends Params<string>> = {
  route: RouteAttribute<P>
  app: useAppProps
}

export type WithOptionRouteAttributeProps<P extends Params<string>> = {
  route?: RouteAttribute<P>
}

type RouterContextProps = {
  message: (props: ArgsProps) => void
}

export const RouterContext = React.createContext<RouterContextProps>({
  message: () => {},
})

export default function(options?: WithRouterOptions<Params<string>>): any {
  return (PageComponent: React.ComponentType<any>) => () => {
   
    const onBeforeEnter = options?.onBeforeEnter || (() => Promise.resolve(true))
    const [searchParams, _setSearchParams] = useSearchParams()
    const [props, setProps] = useState({})
    const [enter, setEnter] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const route = {
      navigate: useNavigate(),
      params: useParams(),
      searchParams: searchParams
    }
    const app = App.useApp()

    useEffect(() => {
      onBeforeEnter(route, app).then((value) => {
        if (value && typeof(value) === 'object' && !Array.isArray(value)) {
          setProps(value)
        }

        setEnter(!(value === false))

      })
    }, [])

    return (
      <>
        <RouterContext.Provider value={{
          message: (props) => messageApi.open(props)
        }}
        >
          {
            enter ?  <PageComponent {...props} route={route} app={app}></PageComponent> : <div>load...</div>
          }
          {contextHolder}
        </RouterContext.Provider>
      </>
    )
  }
}