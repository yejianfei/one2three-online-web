/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:34:45
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-05 15:39:46
 * @Description: 
 * @Developer: 
 */
import React from 'react'
import View from '../../components/View'
import AdminPage from '../../components/antd/AdminPage'
import { Button, Card, Col, Divider, Form, Input, Modal, Row, Space } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import APITable from '../../components/antd/APITable'
import Separator from '../../components/Separator'
import WithRouter, { WithRouteAttributeProps } from '../../components/WithRouter'
import APIFormModal from '../../components/antd/APIFormModal'

type Props = {

}

type RouteParams = {
  
}

type State = {
  selected?: string
  params?: {
    timestamp?: number
  }
}

@WithRouter()
export default class AdminUserListPage extends React.Component<Props & WithRouteAttributeProps<RouteParams>, State> {

  readonly state: Readonly<State> = {}

  render(): React.ReactNode {
    return (
      <AdminPage>
        <Card style={{height: '100%'}} bodyStyle={{padding: 12, height: '100%'}}>
          <APITable
            bordered
            tableLayout='fixed'
            load={`/admin/users/list/:page`}
            initialParams={{
              page: 1,
              size: 25,
              group: 'cn.com.one2three.admin',
              filters: true
            }}
            params={this.state.params}
            size='small'
            rowKey='id'
            // scroll={{y: 100}}
            pagination={{showSizeChanger: false}}
            selected={this.state.selected}
            columns={[{
              title: '账号名称',
              width: 200,
              align: 'center',
              dataIndex: 'username'
            },{
              title: '真实姓名',
              width: 200,
              align: 'center',
              dataIndex: 'name'
            },{
              title: '手机号码',
              width: 200,
              align: 'center',
              dataIndex: 'phone'
            },{
              title: '电子邮箱',
              width: 200,
              align: 'center',
              dataIndex: 'email'
            },{
              title: '操作',
              dataIndex: 'operation',
              align: 'center',
              width: 200,
              render: ((text: string, record: any, index: number, instance: any) => {
                return (
                  <Space>
                    <Button type="link" onClick={() => instance.modal(record.id)}>编辑</Button>
                    <Button danger type="link">删除</Button>
                  </Space>
                )
              }) as any
            }]}
            search = {{
              children: (table: any) => {
                return (
                  <>
                    <Row>
                      <Col flex={1}>
                        <Space>
                          <Form.Item>
                            <Button onClick={() => table.modal()} icon={<UserAddOutlined />}  />
                          </Form.Item>
                        </Space>
                      </Col>
                      <Col span={8}>
                        <Form.Item name={['keywords']}>
                          <Input.Search placeholder='输入账号名称检索' allowClear enterButton onSearch={() => table.search()} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                )
              }
            }}
            form = {{
              title: '账号信息',
              action: '/admin/users',
              loader: '/admin/users/:id',
              name: 'user-form',
              value: this.state.selected,
              initialValues: {
                group: 'cn.com.one2three.admin', 
                mode: 0
              },
              children: (
                <>
                  <Form.Item
                    label='账号名称'
                    labelCol={{span: 5}}
                    name={['username']}
                    rules={[{ required: true, message: '请输入登录账号' }]}
                  >
                    <Input placeholder='输入登录账号' />
                  </Form.Item>
                  <Form.Item
                    label='登录密码'
                    labelCol={{span: 5}}
                    name={['password']}
                    rules={[{ required: true, message: '请输入登录密码' }]}
                  >
                    <Input.Password placeholder='入登录密码' />
                  </Form.Item>
                  <Form.Item
                    label='真实姓名'
                    labelCol={{span: 5}}
                    name={['name']}
                  >
                    <Input placeholder='输入真实姓名（可选）' />
                  </Form.Item>
                  <Form.Item
                    label='联系手机'
                    labelCol={{span: 5}}
                    name={['phone']}
                  >
                    <Input placeholder='输入联系手机（可选）' />
                  </Form.Item>
                  <Form.Item
                    label='电子邮箱'
                    labelCol={{span: 5}}
                    name={['email']}
                  >
                    <Input placeholder='输入联系邮箱（可选）' />
                  </Form.Item>
                </>
              )
            }}
          >
          </APITable>
        </Card>
      </AdminPage>
    )
  }
}