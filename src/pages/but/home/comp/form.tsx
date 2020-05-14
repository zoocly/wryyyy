import React, { Fragment } from 'react';
import { Button, Form, Input, DatePicker } from 'antd';
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export default function index(props:any){
  const [form] = Form.useForm();
  const onFinish = (values:any) =>{
    console.log(values,'onFinish');
  };
  const onFinishFailed = (values:any) =>{
    console.log(values,'onFinishFailed');
  };
  const onClick = () =>{
    console.log(form.setFieldsValue({password:'123'}));
  };
  return (
    <div>
      <Button onClick={onClick}>setFieldsValue</Button>
      <Form
        {...formItemLayout}
        name="basic"
        form={form}
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

        <Form.Item
          label="日期"
          name="time"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
