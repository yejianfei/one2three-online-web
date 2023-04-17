/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:34:45
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-11 14:15:13
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
import APICascader from '../../components/antd/APICascader'
import IconFont from '../../icons'

type Props = {

}

type RouteParams = {
  
}

type State = {
}

@WithRouter()
export default class AdminDiagnosticListPage extends React.Component<Props & WithRouteAttributeProps<RouteParams>, State> {

  readonly state: Readonly<State> = {}

  render(): React.ReactNode {
    return (
      <AdminPage>
        <Card style={{height: '100%'}} bodyStyle={{padding: 12, height: '100%'}}>
          <APITable
            bordered
            tableLayout='fixed'
            loader={`/admin/organizations/list/:page?type=treatment_item`}
            initialParams={{
              page: 1,
              size: 25,
              filters: true
            }}

            size='small'
            rowKey='id'
            // scroll={{y: 100}}
            pagination={{showSizeChanger: false}}
 
            columns={[{
              title: '项目名称',
              width: 200,
              align: 'center',
              dataIndex: 'name'
            },{
              title: '所属医院',
              width: 200,
              align: 'center',
              dataIndex: 'name'
            },{
              title: '所属科室',
              width: 200,
              align: 'center',
              dataIndex: 'phone'
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
                  <Row>
                    <Col span={4}>
                      <Form.Item name={['path']}>
                        <APICascader 
                          loader={{
                            root: '/admin/organizations/tree/:path/children?type=hospital',
                            children: '/admin/organizations/tree/:path/children',
                          }}
                          params={{
                            path: 'root'
                          }}
                          depth={2}
                          cascadeParamName='path'
                          placeholder='按医院及科室过滤'
                          fieldNames={{
                            label: 'name',
                            value: 'id',
                            path: 'full_path'
                          }}
                          onChange={(value) => {
                            console.log('ccc', value)
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Separator direction='horizontal' size={8} />
                    <Col span={8}>
                      <Form.Item name={['keywords']}>
                        <Input.Search placeholder='输入诊疗项目名称检索' allowClear enterButton onSearch={() => table.search()} />
                      </Form.Item>
                    </Col>
                    <Col flex={1}>
                      <Row justify='end'>
                        <Space>
                          <Form.Item>
                            <Button onClick={() => table.modal()} icon={<IconFont type='icon-diagnosis-add' />}  />
                          </Form.Item>
                        </Space>
                      </Row>
                    </Col>
                  </Row>
                )
              }
            }}
            form = {{
              title: '诊疗项目',
              action: '/admin/users',
              loader: '/admin/users/:id',
              name: 'user-form',
              initialValues: {
                type: 'treatment_item',
              },
              onLoaded: async (values: any) => ({...values, password: Date.now()}),
              children: (values) => (
                <>
                  <Form.Item
                    label='项目名称'
                    labelCol={{span: 5}}
                    name={['name']}
                    rules={[{ required: true, message: '请输入登录账号' }]}
                  >
                    <Input disabled={!!values.id} placeholder='输入诊疗项目名称' />
                  </Form.Item>
                  <Form.Item
                    label='所属科室'
                    labelCol={{span: 5}}
                    name={['path']}
                    rules={[{ required: true, message: '请输入登录密码' }]}
                  >
                    <APICascader 
                      loader={{
                        root: '/admin/organizations/tree/:path/children?type=hospital',
                        children: '/admin/organizations/tree/:path/children',
                      }}
                      params={{
                        path: 'root'
                      }}
                      depth={2}
                      cascadeParamName='path'
                      placeholder='选择所属医院及科室'
                      fieldNames={{
                        label: 'name',
                        value: 'id',
                        path: 'full_path'
                      }}
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