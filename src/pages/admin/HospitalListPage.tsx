/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:34:45
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-06 16:18:10
 * @Description: 
 * @Developer: 
 */
import React from 'react'
import AdminPage from '../../components/antd/AdminPage'
import { Button, Card, Col, Divider, Form, Input, Modal, Row, Space } from 'antd'
import APITable from '../../components/antd/APITable'
import WithRouter, { WithRouteAttributeProps } from '../../components/WithRouter'
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
            load={`/admin/organizations/list/:page?type=hospital`}
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
              title: '医院名称',
              width: 200,
              align: 'center',
              dataIndex: 'name'
            },{
              title: '医院地址',
              width: 300,
              align: 'center',
              dataIndex: 'address'
            },{
              title: '操作',
              dataIndex: 'operation',
              align: 'center',
              width: 100,
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
                    <Col span={8}>
                      <Form.Item name={['keywords']}>
                        <Input.Search placeholder='输入医院名称检索' allowClear enterButton onSearch={() => table.search()} />
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
              title: '医院信息',
              action: '/admin/organizations',
              loader: '/admin/organizations/:id',
              name: 'hospital-form',
              initialValues: {
                type: 'hospital',
              },
              onLoaded: async (values: any) => ({...values, password: Date.now()}),
              children: (values) => (
                <>
                  <Form.Item
                    label='医院名称'
                    labelCol={{span: 5}}
                    name={['name']}
                    rules={[{ required: true, message: '请输入医院名称' }]}
                  >
                    <Input placeholder='请输入医院名称' />
                  </Form.Item>
                  <Form.Item
                    label='医院地址'
                    labelCol={{span: 5}}
                    name={['address']}
                    rules={[{ required: true, message: '请输入医院地址' }]}
                  >
                    <Input placeholder='请输入医院地址' />
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