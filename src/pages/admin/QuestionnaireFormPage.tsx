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
import { Button, Card, Col, Form, FormInstance, Input, Row, Space } from 'antd'
import WithRouter, { WithRouteAttributeProps, RouteAttribute } from '../../components/WithRouter'
import { Params } from 'react-router-dom'
import APIForm from '../../components/antd/APIForm'
import APITagListSearchSelect from '../../components/antd/APITagListSearchSelect'
import APICascader from '../../components/antd/APICascader'
import APISelect from '../../components/antd/APISelect'
import { useAppProps } from 'antd/es/app/context'

import Api, { GenericHttpInstance } from '../../api'

const api: GenericHttpInstance = Api()

type Questionnaire = {
  type: number
  hospital_id: string
  department_id: string
  treatment_item_id: string
  title: string
}

type Props = {
  id: string
  questions: Question[]
  form: any
}

type RouteParams = {
  
}

type State = {

}

@WithRouter({
  onBeforeEnter: async (route: RouteAttribute<Params<string>>, app: useAppProps) => {
    return {
      id: route.params?.id,
    }
  }
})
export default class AdminQuestionnaireFormPage extends React.Component<Props & WithRouteAttributeProps<RouteParams>, State> {

  readonly state: Readonly<State> = {}

  ref: React.RefObject<FormInstance<any>> = React.createRef<FormInstance>()

  render(): React.ReactNode {

    return (
      <AdminPage>
        <Card 
          title='通用问卷' 
          size='small' 
          style={{height: '100%'}} 
        >
          <APIForm 
            ref={this.ref}
            action='/admin/questionnaires'
            loader='/admin/questionnaires/:id'
            value={this.props.id}
            labelCol={{span: 2}}
            onRequestSucceeded={() => this.props.route.navigate(-1)}
          >
            {
              (values) => (
                <>
                  <Form.Item
                    label='问券标题'
                    name={['title']}
                    rules={[{ required: true, message: '请输入问券标题' }]}
                    wrapperCol={{span: 8}}
                  >
                    <Input placeholder='请输入问券标题' />
                  </Form.Item>
                  <Form.Item
                    label='诊疗项目'
                    wrapperCol={{span: 8}}
                    name={['path']}
                    rules={[
                      { required: true, validator: (_, value: string) => {
                        if (!value) {
                          return Promise.reject(new Error('请正确选择医院/科室/诊疗项目'));
                        }

                        if (value && value.split('/').length !== 3) {
                          return Promise.reject(new Error('请正确选择医院/科室/诊疗项目'));
                        }

                        return Promise.resolve();
                      }}
                    ]}
                  >
                    <APICascader 
                      loader={{
                        root: '/admin/organizations/tree/:path/children?type=hospital',
                        children: '/admin/organizations/tree/:path/children',
                      }}
                      params={{
                        path: 'root'
                      }}
                      depth={3}
                      cascadeParamName='path'
                      placeholder='选择所属医院、科室、诊疗项目'
                      fieldNames={{
                        label: 'name',
                        value: 'id',
                        path: 'full_path'
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label='问题列表'
                    name={['question_ids']}
                  >
                    <APITagListSearchSelect
                      loader='/admin/questions/typeahead'
                      tags={`/admin/questions/${this.props.id}/list`}
                      searchParamName='keywords'
                      tagFieldNames={{text: 'title'}}
                      onChange={(value) => {
                        console.log(value)
                      }}
                    />
                  </Form.Item>

                  <Row justify='end'>
                    <Col>
                    <Space>
                      <Button onClick={() => this.props.route.navigate(-1)} >取消</Button>
                      <Button type="primary" htmlType='submit'>确定</Button>
                    </Space>
                    </Col>
                  </Row>
                </>
              )
            }
          </APIForm>

        </Card>
      </AdminPage>
    )
  }
}