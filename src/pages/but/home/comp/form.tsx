import React, { Fragment } from 'react';
import { Button, Form, Input } from 'antd';
import _debounce from 'lodash/debounce';
import _isEmpty from 'lodash/isEmpty';
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
function index(props:any) {
  const { getFieldDecorator, setFieldsValue } = props['form'];
  const sure = () => {
    props['form'].validateFieldsAndScroll((err:any, val:any) => {
      if(!err){
        console.log(val,'sss')
      }
    });
  };
  const validateIDCard = (rule:any, value:any, callback:any) =>{
    if (!_isEmpty(value)){
      if (value.length !== 18) {
        callback('身份证应该为18位');
      }
    }
    callback();
  };

  function onChange(val:any) {
    console.log(val,'val1');
    function func(event:any) {
      console.log(val,'val2');
      console.log('event:', event);
    }
    return func;
  }
  return (
    <div>
      <Form {...formItemLayout}>
        <FormItem
          label={'aaa'}
        >
          {getFieldDecorator('idCard', {
            // initialValue:dataInfo['a0501B'] || undefined,
            rules: [
              { required: true, message: '' },
              // { validator: _debounce(validateIDCard,1000) }
            ],
          })(
            <Fragment>
              <Input type="text" onChange={onChange}/>
            </Fragment>
          )}
        </FormItem>
        <Button onClick={sure}>确定</Button>
      </Form>
      <input type="text" onChange={_debounce(onChange,1000)}/> 
      <Input onChange={_debounce(function(val) {
        console.log(val)
      },1000)}/>
    </div>
  )
}
export default Form.create<any>()(index);
