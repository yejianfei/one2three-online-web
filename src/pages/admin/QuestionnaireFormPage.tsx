/*
 * @Author: yejianfei
 * @Date: 2023-04-03 22:34:45
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-22 16:36:21
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
import APIForm from '../../components/antd/APIForm'
import APITagListSearchSelect from '../../components/antd/APITagListSearchSelect'

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

@WithRouter({
  onBeforeEnter: async() => {
    return {ccc: 'ccc'}
  }
})
export default class AdminQuestionnaireFormPage extends React.Component<Props & WithRouteAttributeProps<RouteParams>, State> {

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
          title='新增通用问卷' 
          size='small' 
          style={{height: '100%'}} 
        >
          <APIForm labelCol={{span: 2}}>
            <Form.Item
              label='账号名称'
              name={['username']}
              rules={[{ required: true, message: '请输入登录账号' }]}
              wrapperCol={{span: 10}}
            >
              <Input placeholder='输入登录账号' />
            </Form.Item>
            <Form.Item
              label='登录密码'
              name={['password']}
              rules={[{ required: true, message: '请输入登录密码' }]}
              wrapperCol={{span: 4}}
            >
              <Input.Password placeholder='入登录密码' />
            </Form.Item>
            <Form.Item
              label='真实姓名'
              name={['name']}
              wrapperCol={{span: 4}}
            >
              <Input placeholder='输入真实姓名（可选）' />
            </Form.Item>
            <Form.Item
              label='问题列表'
              name={['aaa']}
            >
              <APITagListSearchSelect
                loader='/admin/questions/typeahead'
                tags={[]}
                searchParamName='keywords'
                tagFieldNames={{text: 'title'}}
                onChange={(value) => {
                  console.log(value)
                }}
              />
            </Form.Item>
          </APIForm>
          <Row justify='end'>
            <Col>
            <Space>
              <Button>取消</Button>
              <Button type='primary'>确定</Button>
            </Space>
            </Col>
          </Row>

        </Card>
      </AdminPage>
    )
  }
}