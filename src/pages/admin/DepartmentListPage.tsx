/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:34:45
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-11 14:15:19
 * @Description: 
 * @Developer: 
 */
import React from 'react'
import AdminPage from '../../components/antd/AdminPage'
import { Button, Card, Col, Form, Input, Row, Space, Radio } from 'antd'
import APITable from '../../components/antd/APITable'
import WithRouter, { WithRouteAttributeProps } from '../../components/WithRouter'
import APISelect from '../../components/antd/APISelect'
import IconFont from '../../icons'

import { CancelRuleOptions, BooleanOptions, BooleanFilter } from '../../options'

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
            loader={`/admin/organizations/list/:page?type=department`}
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
              title: '科室名称',
              width: 200,
              align: 'center',
              dataIndex: 'name'
            },{
              title: '科室编码',
              width: 200,
              align: 'center',
              dataIndex: 'code'
            },{
              title: '所属医院',
              width: 200,
              align: 'center',
              dataIndex: ['parent', 'name']
            },{
              title: '预约确认',
              width: 200,
              align: 'center',
              dataIndex: ['extra', 'appointment_confirm'],
              render: (value: number) => BooleanFilter[value]
            },{
              title: '医生选择',
              width: 200,
              align: 'center',
              dataIndex: ['extra', 'doctor_option'],
              render: (value: number) => BooleanFilter[value]
            },{
              title: '操作',
              dataIndex: 'operation',
              align: 'center',
              width: 100,
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
              title: '科室信息',
              action: '/admin/organizations',
              loader: '/admin/organizations/:id',
              name: 'department-form',
              initialValues: {
                type: 'department',
                extra: { 
                  'appointment_confirm': '',
                  'doctor_option': '',
                  'cancel_rule': '',
                  'cancel_rule_hour': ''
                }
              },
              onLoaded: async (values: any) => ({...values, password: Date.now()}),
              children: (values) => (
                <>
                  <Form.Item
                    label='科室名称'
                    labelCol={{span: 5}}
                    name={['name']}
                    rules={[{ required: true, message: '请输入科室名称' }]}
                  >
                    <Input placeholder='请输入科室名称' />
                  </Form.Item>
                  <Form.Item
                    label='科室编码'
                    labelCol={{span: 5}}
                    name={['code']}
                    rules={[{ required: true, message: '请输入科室编码' }]}
                  >
                    <Input placeholder='请输入科室编码' />
                  </Form.Item>
                  <Form.Item
                    label='所属医院'
                    labelCol={{span: 5}}
                    name={['path']}
                    rules={[{ required: true, message: '请选择医院' }]}
                  >
                    <APISelect 
                      loader={'/admin/organizations/tree/:path/children?type=hospital'}
                      placeholder="请选择医院"
                      params={{
                        path: 'root'
                      }}
                      fieldNames={{
                        label: 'name',
                        value: 'id'
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label='预约确认'
                    labelCol={{span: 5}}
                    name={['extra', 'appointment_confirm']}
                    rules={[{ required: true, message: '请选择' }]}
                  >
                    <Radio.Group options={BooleanOptions.map(item => ({label: item.name, value: item.id}))} />
                  </Form.Item>
                  <Form.Item
                    label='医生选择'
                    labelCol={{span: 5}}
                    name={['extra', 'doctor_option']}
                    rules={[{ required: true, message: '请选择' }]}
                  >
                    <Radio.Group options={BooleanOptions.map(item => ({label: item.name, value: item.id}))} />
                  </Form.Item>
                  <Form.Item
                    label='取消限制'
                    labelCol={{span: 5}}
                    name={['extra', 'cancel_rule']}
                    rules={[{ required: true, message: '请选择' }]}
                  >
                    <Radio.Group options={CancelRuleOptions.map(item => ({label: item.name, value: item.id}))} />
                  </Form.Item>
                  {
                    values?.extra?.cancel_rule === 1 ? (
                      <Form.Item
                        hidden={values?.extra?.cancel_rule !== 1}
                        label='小时'
                        labelCol={{span: 5}}
                        name={['extra', 'cancel_rule_day']}
                        rules={[{ required: true, message: '请输入小时' }]}
                      >
                        <Input type='number' placeholder='请输入小时' addonAfter='小时后'/>
                      </Form.Item>
                    ) : null
                  }
                  {
                    values?.extra?.cancel_rule === 2 ? (
                      <Form.Item
                        label='小时'
                        labelCol={{span: 5}}
                        name={['extra', 'cancel_rule_hour']}
                        rules={[{ required: true, message: '请输入小时' }]}
                      >
                        <Input type='number' placeholder='请输入小时' addonAfter='小时前'/>
                      </Form.Item>
                    ) : null
                  }
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