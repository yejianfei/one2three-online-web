/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:34:45
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-17 16:21:28
 * @Description: 
 * @Developer: 
 */
import React from 'react'
import AdminPage from '../../components/antd/AdminPage'
import { Button, Card, Col, Form, Input, Row, Space, Radio } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import APITable from '../../components/antd/APITable'
import WithRouter, { RouterContext, WithRouteAttributeProps } from '../../components/WithRouter'
import APITreeSelect from '../../components/antd/APITreeSelect'

import { HospitalGroupOptions, HospitalGroupFilter, UserTypeOptions, UserTypeFilter } from '../../options'

type Props = {

}

type RouteParams = {
  
}

type State = {
}

@WithRouter()
export default class AdminUserListPage extends React.Component<Props & WithRouteAttributeProps<RouteParams>, State> {

  readonly state: Readonly<State> = {}

  static contextType = RouterContext
  context!: React.ContextType<typeof RouterContext>

  errMessage: {[key: number]: string} = {
    10101: '用户已存在'
  }

  render(): React.ReactNode {
    return (
      <AdminPage>
        <Card style={{height: '100%'}} bodyStyle={{padding: 12, height: '100%'}}>
          <APITable
            bordered
            tableLayout='fixed'
            loader={`/admin/users/list/:page`}
            initialParams={{
              page: 1,
              size: 25,
              group: 'cn.com.one2three.hospital.*',
              filters: true
            }}

            size='small'
            rowKey='id'
            // scroll={{y: 100}}
            pagination={{showSizeChanger: false}}
 
            columns={[{
              title: '登录手机',
              width: 200,
              align: 'center',
              dataIndex: 'phone'
            },{
              title: '真实姓名',
              width: 200,
              align: 'center',
              dataIndex: 'name'
            },{
              title: '电子邮箱',
              width: 200,
              align: 'center',
              dataIndex: 'email'
            },{
              title: '医护角色',
              width: 200,
              align: 'center',
              dataIndex: 'group',
              render: (value: string) => HospitalGroupFilter[value]
            },{
              title: '账户类型',
              width: 200,
              align: 'center',
              dataIndex: 'type',
              render: (value: number) => UserTypeFilter[value]
            },{
              title: '操作',
              dataIndex: 'operation',
              align: 'center',
              width: 200,
              render: ((text: string, record: any, index: number, instance: any) => {
                return (
                  <Space>
                    <Button type="link" onClick={() => instance.modal(record.id)}>编辑</Button>
                    <Button danger type="link" onClick={() => instance.delete(record.id)}>删除</Button>
                  </Space>
                )
              }) as any
            }]}
            search = {{
              children: (table: any) => {
                return (
                  <Row>
                    <Col span={8}>
                      <Form.Item name={['keywords']}>
                        <Input.Search placeholder='输入账号名称检索' allowClear enterButton onSearch={() => table.search()} />
                      </Form.Item>
                    </Col>
                    <Col flex={1}>
                      <Row justify='end'>
                      <Space>
                        <Form.Item>
                          <Button onClick={() => table.modal()} icon={<UserAddOutlined />}  />
                        </Form.Item>
                        </Space>
                      </Row>
                    </Col>
                  </Row>
                )
              }
            }}
            form = {{
              title: '账号信息',
              action: '/admin/users',
              loader: '/admin/users/:id',
              name: 'user-form',
              initialValues: {
                mode: 0,
                groups: ['cn.com.one2three.hospital.doctor', 'cn.com.one2three.hospital.nurse']
              },
              onSucceededMessage: (method, res, values) => {
                this.context.message({type: 'success', content: '操作成功'})
              },
              onFailedMessage: (method: 'post' | 'put', error: any, values: any) => {
                this.context.message({type: 'error', content: this.errMessage[error] || '未知错误，请联系管理员'})
              },
              onLoaded: async (values: any) => ({...values, password: Date.now()}),
              children: (values) => (
                <>
                  <Form.Item
                    label='登录手机'
                    labelCol={{span: 5}}
                    name={['username']}
                    rules={[{ required: true, message: '请输入登录手机', pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/ }]}
                  >
                    <Input disabled={!!values.id} placeholder='输入登录手机' />
                  </Form.Item>
                  <Form.Item
                    label='登录密码'
                    labelCol={{span: 5}}
                    name={['password']}
                    rules={[{ required: true, message: '请输入登录密码' }]}
                  >
                    <Input.Password disabled={!!values.id} placeholder='输入登录密码' />
                  </Form.Item>
                  <Form.Item
                    label='真实姓名'
                    labelCol={{span: 5}}
                    name={['name']}
                  >
                    <Input placeholder='输入真实姓名（可选）' />
                  </Form.Item>
                  <Form.Item
                    label='电子邮箱'
                    labelCol={{span: 5}}
                    name={['email']}
                  >
                    <Input placeholder='输入联系邮箱（可选）' />
                  </Form.Item>
                  <Form.Item
                    label='医护角色'
                    labelCol={{span: 5}}
                    name={['group']}
                    rules={[{ required: true, message: '请选择' }]}
                  >
                    <Radio.Group options={HospitalGroupOptions.map(item => ({label: item.name, value: item.id}))} />
                  </Form.Item>
                  <Form.Item
                    label='账户类型'
                    labelCol={{span: 5}}
                    name={['type']}
                    rules={[{ required: true, message: '请选择' }]}
                  >
                    <Radio.Group options={UserTypeOptions.map(item => ({label: item.name, value: item.id}))} />
                  </Form.Item>
                  <Form.Item
                    label='医院科室'
                    labelCol={{span: 5}}
                    name={['organization_paths']}
                    rules={[
                      { required: true, validator: (_, value: string[]) => {
                        if (!value || value.length === 0) {
                          return Promise.reject(new Error('请正确选择医院/科室'));
                        }

                        const array = value.filter((item: string) => !item || item.split('/').length !== 2)
                        if (array && array.length !== 0) {
                          return Promise.reject(new Error('请正确选择医院/科室'));
                        }

                        return Promise.resolve();
                      }}
                    ]}
                  >
                    <APITreeSelect 
                      loader={{
                        root: '/admin/organizations/tree/:path/children?type=hospital',
                        children: '/admin/organizations/tree/:path/children',
                      }}
                      params={{
                        path: 'root'
                      }}
                      multiple
                      treeCheckable={true}
                      showSearch={false}
                      leafSelectableOnly={true}
                      leafCheckableOnly={true}
                      depth={2}
                    />
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