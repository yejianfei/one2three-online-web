/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:34:45
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-17 10:59:52
 * @Description: 
 * @Developer: 
 */
import React from 'react'
import AdminPage from '../../components/antd/AdminPage'
import { Button, Card, Input, Space } from 'antd'
import APITable from '../../components/antd/APITable'
import WithRouter, { WithRouteAttributeProps } from '../../components/WithRouter'
import InputTags from '../../components/antd/APITags'

import Api, { GenericHttpInstance } from '../../api'

type Props = {

}

type RouteParams = {
  
}

type State = {
  items: Question[]
}

@WithRouter()
export default class AdminQuestionFormPage extends React.Component<Props & WithRouteAttributeProps<RouteParams>, State> {

  api: GenericHttpInstance = Api()

  readonly state: Readonly<State> = {
    items: []
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.setState({items: new Array(1).fill({}).map((item, index) => ({
      id: `${index}`,
      title: '',
      options: []
    }))})
  }

  reset(items: Question[]) {
    console.log('items', items)

    let index: number = items.findIndex(item => !item.title && item.options.length === 0)
    if (index !== -1) {
      this.setState({items})
      return
    }

    items.push({
      id: `${items.length}`,
      title: '',
      options: []
    })

    this.setState({items})
  }

  submit() {
    this.api.post('/admin/questions/batch', {
      questions: this.state.items
    }).then(res => {
      this.props.route.navigate(-1)
    }).catch(err => {
      console.log('err', err)
    })
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
          extra={
            <Space>
              <Button 
                danger
                size='small' 
                type='link' 
                onClick={() => this.props.route.navigate(-1)} 
                children={'返回'} 
              />
              <Button 
                size='small'
                type='link'
                onClick={() => this.submit()} 
                children={'提交'} 
              />
            </Space>
          }
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
                  <Input value={record.title} onChange={(event) => {
                    const items = [...this.state.items]
                    items[index].title = event.target.value

                    this.reset(items)
                  }}/>
                )
              }) as any
            },{
              title: '选项',
              width: 600,
              align: 'center',
              dataIndex: 'options',
              render: ((text: string, record: any, index: number, instance: any) => {
                return (
                  <InputTags value={record.options} onChange={(value) => {
                    const items = [...this.state.items]
                    items[index].options = value

                    this.reset(items)
                  }} />
                )
              }) as any
            },{
              title: '操作',
              dataIndex: 'operation',
              align: 'center',
              width: 200,
              render: ((text: string, record: any, index: number, instance: any) => {
                return (
                  <Button 
                    danger 
                    size='small' 
                    type='link' 
                    onClick={() => {
                      const items = [...this.state.items]
                      items?.splice(index, 1)

                      this.reset(items)
                    }} 
                    children={'删除'} 
                  />
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