import React, { Fragment } from 'react';
import { Form, Input } from 'antd';

interface Interface {
  form: any
}

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};
const index = (props: Interface) => {
  const { form } = props;
  return (
    <Fragment>
      <Form {...formItemLayout} form={form}>
        <Form.Item label={'标准地址'} name="normAddress" rules={[{ required: true, message: '请输入标准地址' }]}>
          <Input/>
        </Form.Item>
      </Form>

    </Fragment>
  );
};
export default index;
