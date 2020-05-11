import React, { Fragment } from 'react';
import { Button, Form, Input } from 'antd';
import TSelect from 'components/TableSelect';
import _debounce from 'lodash/debounce';
import _isEmpty from 'lodash/isEmpty';
import {list} from '@/pages/services/login';
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
function index(props:any) {
  const onFinish = (values:any) =>{
    console.log(values,'onFinish')
  };
  const onFinishFailed = (values:any) =>{
    console.log(values,'onFinishFailed')
  };
  return (
    <div>
      <Form
        {...formItemLayout}
        name="basic"
        initialValues={{ username: 12333 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="帐号"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default index;
