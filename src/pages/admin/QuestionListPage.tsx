/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:34:45
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-28 14:05:15
 * @Description: 
 * @Developer: 
 */
import React from 'react'
import AdminPage from '../../components/antd/AdminPage'
import { Button, Card, Col, Form, Input, Row, Space } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import APITable from '../../components/antd/APITable'
import InputTags from '../../components/antd/APITags'
import WithRouter, { WithRouteAttributeProps } from '../../components/WithRouter'
import IconFont from '../../icons'

type Props = {

}

type RouteParams = {
  
}

type State = {
}

@WithRouter()
export default class AdminQuestionListPage extends React.Component<Props & WithRouteAttributeProps<RouteParams>, State> {

  readonly state: Readonly<State> = {}

  render(): React.ReactNode {
    return (
      <AdminPage
        breadcrumbs={[{
          label: '首页',
          url: '../home'
        },{
          label: '问题管理',
          url: '../questions'
        }]}
      >
        <Card style={{height: '100%'}} bodyStyle={{padding: 12, height: '100%'}}>
          <APITable
            bordered
            tableLayout='fixed'
            loader={`/admin/questions/list/:page`}
            initialParams={{
              page: 1,
              size: 25,
              filters: true
            }}

            size='small'
            rowKey='id'
            pagination={{showSizeChanger: false}}
 
            columns={[{
              title: '问题',
              width: 200,
              align: 'center',
              dataIndex: 'title'
            },{
              title: '选项',
              width: 200,
              align: 'center',
              dataIndex: 'options',
              render: (value: string[]) => value?.join(',') || ''
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
                        <Input.Search placeholder='输入问题检索' allowClear enterButton onSearch={() => table.search()} />
                      </Form.Item>
                    </Col>
                    <Col flex={1}>
                      <Row justify='end'>
                      <Space>
                        <Form.Item>
                          <Button onClick={() => this.props.route.navigate('form')} icon={<IconFont type='icon-questions-add' />}  />
                        </Form.Item>
                        </Space>
                      </Row>
                    </Col>
                  </Row>
                )
              }
            }}
            form = {{
              title: '问题',
              action: '/admin/questions',
              loader: '/admin/questions/:id',
              name: 'question-form',
              initialValues: {
                options: []
              },
              onLoaded: async (values: any) => ({...values, password: Date.now()}),
              children: (values) => (
                <>
                  <Form.Item
                    label='问题'
                    labelCol={{span: 5}}
                    name={['title']}
                    rules={[{ required: true, message: '请输入问题' }]}
                  >
                    <Input placeholder='请输入问题' />
                  </Form.Item>
                  <Form.Item
                    label='选项'
                    labelCol={{span: 5}}
                    name={['options']}
                    rules={[{ required: true, message: '请输入选项' }]}
                  >
                    <InputTags />
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