import React, { Fragment } from 'react';
import { Form, Input, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export default function index() {
  const [form] = Form.useForm();
  const onFinish = (values:any) =>{
    console.log(values,'onFinish');
  };
  const onFinishFailed = (values:any) =>{
    console.log(values,'onFinishFailed');
  };
  return (
    <Fragment>
      <Form
        {...formItemLayout}
        // name="basic"
        form={form}
        // initialValues={{ username: 12333 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.List name="users">
          {
            (fields, { add, remove })=> {
              console.log(fields,'sssss')
              return (
                <Fragment>
                  {
                    fields.map(field => (
                      <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                        <Form.Item
                          {...field}
                          name={[field.name, 'first']}
                          fieldKey={[field.fieldKey, 'first']}
                          rules={[{ required: true, message: 'Missing first name' }]}
                        >
                          <Input placeholder='First Name' />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, 'last']}
                          fieldKey={[field.fieldKey, 'last']}
                          rules={[{ required: true, message: 'Missing last name' }]}
                        >
                          <Input placeholder="Last Name" />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Space>
                    ))
                  }
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Add field
                    </Button>
                  </Form.Item>
                </Fragment>
              );
            }
          }
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}
