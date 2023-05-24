/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:34:45
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-19 22:52:35
 * @Description: 
 * @Developer: 
 */
import React from 'react'
import AdminPage from '../../components/antd/AdminPage'
import { Button, Card, Col, Form, Input, Row, Space } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
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
export default class AdminQuestionnaireListPage extends React.Component<Props & WithRouteAttributeProps<RouteParams>, State> {

  readonly state: Readonly<State> = {}

  render(): React.ReactNode {
    return (
      <AdminPage>
        <Card style={{height: '100%'}} bodyStyle={{padding: 12, height: '100%'}}>
          <APITable
            bordered
            tableLayout='fixed'
            loader={`/admin/questionnaires/list/:page`}
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
              title: '问券标题',
              width: 200,
              align: 'center',
              dataIndex: 'title'
            },{
              title: '所属医院',
              width: 200,
              align: 'center',
              dataIndex: 'hospital_name'
            },{
              title: '所属科室',
              width: 200,
              align: 'center',
              dataIndex: 'department_name'
            },{
              title: '诊疗项目',
              width: 200,
              align: 'center',
              dataIndex: 'treatment_item_name'
            },{
              title: '操作',
              dataIndex: 'operation',
              align: 'center',
              width: 200,
              render: ((text: string, record: any, index: number, instance: any) => {
                return (
                  <Space>
                    <Button type="link" onClick={() => this.props.route.navigate(`form/${record.id}`)}>编辑</Button>
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
                        <Input.Search placeholder='输入问券标题检索' allowClear enterButton onSearch={() => table.search()} />
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
              title: '问券',
              action: '/admin/questionnaires',
              loader: '/admin/questionnaires/:id',
              name: 'questionnaire-form',
            }}
          >
          </APITable>
        </Card>
      </AdminPage>
    )
  }
}