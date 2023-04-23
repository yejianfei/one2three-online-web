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
import APISelect from '../../components/antd/APISelect'
import { useAppProps } from 'antd/es/app/context'

type Question = {
  id: string
  title: string
  options: string[]
}

type Questionnaire = {
  type: number
  hospital_id: string
  department_id: string
  treatment_item_id: string
  title: string
}

type Props = {
  id: string
  record: Questionnaire
}

type RouteParams = {
  
}

type State = {
  hospital: string
  department: string
  treatment_item: string
}

@WithRouter({
  onBeforeEnter: async (route: RouteAttribute<Params<string>>, app: useAppProps) => {
    return {
      id: route.params?.id,
    }
  }
})
export default class AdminQuestionnaireFormPage extends React.Component<Props & WithRouteAttributeProps<RouteParams>, State> {

  readonly state: Readonly<State> = {
    hospital: this.props.record?.hospital_id || '',
    department: this.props.record?.department_id || '',
    treatment_item: this.props.record?.treatment_item_id || ''
  }

  ref: any = React.createRef<FormInstance>()

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
            <Form.Item
              label='问券标题'
              name={['title']}
              rules={[{ required: true, message: '请输入问券标题' }]}
              wrapperCol={{span: 8}}
            >
              <Input placeholder='请输入问券标题' />
            </Form.Item>
            <Form.Item
              label='所属医院'
              wrapperCol={{span: 8}}
              name={['hospital_id']}
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
                onChange={(value: string) => this.setState({hospital: value}) }
              />
            </Form.Item>
            {
              this.state.hospital ? (
                <Form.Item
                  label='所属科室'
                  wrapperCol={{span: 8}}
                  name={['department_id']}
                  rules={[{ required: true, message: '请选择科室' }]}
                >
                  <APISelect 
                    loader={`/admin/organizations/tree/:path/children`}
                    placeholder="请选择科室"
                    params={{
                      path: `${this.state.hospital}`
                    }}
                    fieldNames={{
                      label: 'name',
                      value: 'id'
                    }}
                    onChange={(value: string) => this.setState({department: value})}
                  />
                </Form.Item>
              ) : undefined
            }
            {
              this.state.department ? (
                <Form.Item
                  label='诊疗项目'
                  wrapperCol={{span: 8}}
                  name={['treatment_item_id']}
                  rules={[{ required: true, message: '请选择诊疗项目' }]}
                >
                  <APISelect 
                    loader={`/admin/organizations/tree/:path/children`}
                    placeholder="请选择诊疗项目"
                    params={{
                      path: `${this.state.hospital}/${this.state.department}`
                    }}
                    fieldNames={{
                      label: 'name',
                      value: 'id'
                    }}
                  />
                </Form.Item>
              ) : undefined
            }
            <Form.Item
              label='问题列表'
              name={['question_ids']}
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

            <Row justify='end'>
              <Col>
              <Space>
                <Button onClick={() => this.props.route.navigate(-1)} >取消</Button>
                <Button type="primary" htmlType='submit'>确定</Button>
              </Space>
              </Col>
            </Row>
          </APIForm>

        </Card>
      </AdminPage>
    )
  }
}