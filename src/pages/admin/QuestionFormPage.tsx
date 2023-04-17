/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:34:45
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-11 15:53:07
 * @Description: 
 * @Developer: 
 */
import React from 'react'
import AdminPage from '../../components/antd/AdminPage'
import { Button, Card, Col, Form, Input, Row, Space } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import APITable from '../../components/antd/APITable'
import WithRouter, { WithRouteAttributeProps } from '../../components/WithRouter'
import View from '../../components/View'
import InputTags from '../../components/antd/APITags'

type Question = {
  id: string
  title: string
  options: string[]
}

type Props = {

}

type RouteParams = {
  
}

type State = {
  items: Question[]
}

@WithRouter()
export default class AdminQuestionFormPage extends React.Component<Props & WithRouteAttributeProps<RouteParams>, State> {

  readonly state: Readonly<State> = {
    items: new Array(10).fill({}).map((item, index) => ({
      id: `${index}`,
      title: '',
      options: []
    }))
  }

  render(): React.ReactNode {
    return (
      <AdminPage>
        <Card 
          title='批量新增问题' 
          size='small' 
          style={{height: '100%'}} 
          bodyStyle={{padding: 12, height: 'calc(100% - 39px)', 
          overflow: 'hidden'}}
        >
          <APITable
            data={this.state.items}
            bordered
            tableLayout='fixed'
            size='small'
            rowKey='id'
            pagination={false}
            // scroll={{y: 600}}
            columns={[{
              title: '描述',
              align: 'left',
              dataIndex: 'title',
              render: ((text: string, record: any, index: number, instance: any) => {
                return (
                  <Input />
                )
              }) as any
            },{
              title: '选项',
              width: 600,
              align: 'center',
              dataIndex: 'options',
              render: ((text: string, record: any, index: number, instance: any) => {
                return (
                  <InputTags value={['a', 'b']} />
                )
              }) as any
            },{
              title: '操作',
              dataIndex: 'operation',
              align: 'center',
              width: 200,
              render: ((text: string, record: any, index: number, instance: any) => {
                return (
                  <Button danger size='small' type="link">删除</Button>
                )
              }) as any
            }]}
          >
          </APITable>
        </Card>
      </AdminPage>
    )
  }
}