/*
 * @Author: yejianfei
 * @Date: 2022-05-28 18:22:45
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-28 12:10:52
 * @Description: 
 * @Developer: 
 */
import React, { useEffect, useState, useImperativeHandle, ReactNode, useRef  } from 'react'
import { Form, FormInstance, Spin, Table, TableProps } from 'antd'
import Api from '../../api'
import { APIFormProps } from './APIForm'
import APIFormModal from './APIFormModal'

const api = Api()


type Params = {page?: number, size?: number} & {[key:string]: boolean | string | number | Date | string[] | number[] | Date[]}

type Props<RecordType extends object = any, FormValues extends object = any > = {
  loader?: string
  initialParams?: Params
  params?: Params,
  data?: any,
  actionType?: string,
  modal?: boolean
  selected?: string
  form?: APIFormProps<FormValues> & {title: string}
  search?: {
    children?: (table: any) => ReactNode
  }
  onModalAfterClose?: () => void
} & TableProps<RecordType>

export default function APITable<RecordType extends object = any>(props: Props<RecordType>) {
  const [scrollY, setScrollY] = useState(0)
  const table = useRef<HTMLDivElement>(null)
  const searchForm = useRef<FormInstance<any>>(null)
  const params = {...(props.initialParams || {}), ...(props.params || {})}
  const [pageIndex, setPage] = useState(params?.page || 1)
  const [scroll, setScroll] = useState(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<RecordType[]>([])
  const [count, setCount] = useState(0)
  const [isModalOpened, setModalOpened] = useState(props.modal)
  const [selected, setSelected] = useState<string | undefined>(undefined)
  const load = (url: string, params?: Params) => {
    setLoading(true)
    api.get<PageResult<RecordType>>(url, {params: {...(params || {})}})
      .then((res) => {
        setData(res.list)
        setCount(res.count)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const remove = (url: string, id?: string[]) => {
    setLoading(true)
    api.delete(url, { data: id })
      .then((res) => {
        if (props.loader) {
          load(props.loader, params)
        }
      })
  }

  const onWindowReize = () => {
    setScrollY((table.current?.clientHeight || 0) - 60)
  }

  useEffect(() => {
    window.addEventListener('resize', onWindowReize)
    onWindowReize()

    return () => {
      window.removeEventListener('resize', onWindowReize)
    }
  }, [])

  useEffect(() => {
    props.loader && load(props.loader, params)
    setPage(1)
  }, [props.params])

  useEffect(() => {
    props.form && setModalOpened(props.modal)
  }, [props.modal])


  const pagination = props.pagination && {
    ...(props.pagination || {}),
    defaultCurrent: params.page || 1,
    defaultPageSize: params.size || 10,
    total: count,
    current: pageIndex,
    onChange: (page: number, size: number) => {
      setPage(page)
      props.loader && load(props.loader, {...params, page, size})
    }
  }

  const instance = {
    modal: (value?: string) => {
      setModalOpened(true)
      setSelected(value)
    },
    delete: (value?: string) => {
      if (props.form && props.form.action && value) {
        remove(props.form.action, [value])
      }
    },
    search() {
      setTimeout(() => {
        props.loader 
          && load(props.loader, {...(props.initialParams || {}), ...(searchForm.current?.getFieldsValue() || {})})
      })
    }
  }

  const columns = (props.columns || []).map((item) => ({
    ...item,
    ...(item.render 
      ? {
        render: (value: any, record: any, index: any) => {
          return item.render && (item.render as any)(value, record, index, instance)
        }} 
      : {}
    )
  }))
  
  return (
    <>
      {props.search?.children && (
        <Form
          ref={searchForm}
        >
          {props.search.children(instance)}
        </Form>
      )}
      <Table 
        {...props}
        columns={columns}
        loading={loading}
        dataSource={props.loader ? data : props.data} 
        pagination={pagination}
        scroll={props.scroll || {y: scrollY}}
        ref={table}
      />
      {props.form && (
        <APIFormModal
          title={props.form.title}
          form={{
            ...props.form,
            value: selected,
            onRequestSucceeded: (method, res, values) => {
              if (props.loader) {
                method === 'post'
                  ? load(props.loader, props.initialParams || {})
                  : load(props.loader, params)
              }
              props.form?.onRequestSucceeded &&  props.form?.onRequestSucceeded(method, res, values)
            }
          }}
          open={isModalOpened}
          afterClose={() => {
            setModalOpened(false)
            props.onModalAfterClose && props.onModalAfterClose()
          }}
        >
          {props.form.children as any}
        </APIFormModal>
      )}
    </>
  )
}