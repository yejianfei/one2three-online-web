/*
 * @Author: yejianfei
 * @Date: 2022-05-26 13:54:33
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-05-21 22:21:41
 * @Description: 
 * @Developer: 
 */
import React, { Component } from 'react'
import { useNavigate, Link, NavigateFunction, Params } from 'react-router-dom'
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Row,
  Col,
} from 'antd'
import APIForm from '../components/antd/APIForm'
import Api from '../api'
import BorderLayout, { BorderCenter, BorderSouth, BorderNorth, BorderWest, BorderEast } from '../components/BorderLayout'
import Image from '../components/Image'

type Prop = {
  route: {
		navigate: NavigateFunction
		params: Readonly<Params<string>>
	}
}

const api = Api()
export default class LoginPage extends Component<Prop> {
  
  readonly state = {
    spinning: false
  }

  render() {
    return (
      <BorderLayout style={{background: 'url(/images/login-banner.png)', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
        <BorderCenter>
          <Row justify='center'>
            <Col><Image style={{height: 64, marginTop: 196}} src='/images/logo-white.png' /></Col>
          </Row>
          <Card style={{width: 360, marginLeft: 'auto', marginRight: 'auto', marginTop: 200}} title="万图随预约及随访运营系统">
            <APIForm
              action="/login"
              name='login-form'
              onBeforeRequest={async (method, values) => {
                return {...values, group: 'cn.com.one2three.admin', mode: 0}
              }}
              onRequestSucceeded={() => this.props.route.navigate('/admin/home', {replace: true})}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入已注册的账号' }]}
              >
                <Input placeholder='输入已注册的邮箱登录系统' />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入登录密码' }]}
              >
                <Input.Password placeholder='输入登录密码' />
              </Form.Item>
                <Row align='middle'>
                  <Col flex={1}>
                    <Link to="/forgot_password">忘记密码？</Link>
                  </Col>
                  <Col>
                    <Button htmlType='submit' type="primary">登录</Button>
                  </Col>
                </Row>
            </APIForm>
          </Card>
        </BorderCenter>
      </BorderLayout>
    )
  }
}