import React, { Fragment, useEffect, useState } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, DatePicker } from 'antd';
import _debounce from 'lodash/debounce';
import { awsl } from '@/pages/services/login'
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export default function index(props:any){
  const [ validateStatus, setValidateStatus ] = useState<any>(undefined);
  const onFinish = (values:any) =>{
    console.log(values,'onFinish');
  };
  const onFinishFailed = (values:any) =>{
    console.log(values,'onFinishFailed');
  };
  const onClick = () =>{
    console.log(form.setFieldsValue({password:'123'}));
  };
  const checkUserName = async (rule:any, value:any, callback:any) =>{
    setValidateStatus('validating');
    const res = await awsl({value});
    setValidateStatus('error');
    callback('错了错了')
  };
  return (
    <div>
      <Button onClick={onClick}>setFieldsValue</Button>
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
          hasFeedback
          validateStatus={validateStatus}
          rules={[
            { required: true, message: 'Please input your username!' },
            {validator:_debounce(checkUserName,1000)}
          ]}
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

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.password !== currentValues.password}
        >
          {({ getFieldValue }) => {
            return getFieldValue('password') === '123' ? (
              <Form.Item name='showHidden' label="隐藏的显示出来了" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            ) : null;
          }}
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
