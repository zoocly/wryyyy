import React, { Fragment, useRef, useState } from 'react';
import { Button, Form, Steps } from 'antd';
import CountdownClass from './components/countdown/wayClass';
import CountdownHook from './components/countdown/wayHook';
import Step1 from './components/step1';
import Step2 from './components/step2';
import Step3 from './components/step3';


const { Step } = Steps;
const index = () => {
  const [step, setStep] = useState(0);
  const stepValueRef = useRef({step1:{},step2:{},step3:{}});
  const [form] = Form.useForm();
  const next = ()=>{
    form.validateFields().then(async values => {
      stepValueRef.current.step1 = values;
      setStep(e=>e+1);
    });
  }
  return (
    <Fragment>
      <CountdownHook/>
      <Steps size="small" current={step}>
        <Step title="1"/>
        <Step title="2"/>
        <Step title="3"/>
      </Steps>
      <div style={{ marginBottom: 20 }}/>
      {
        step === 0 && <Fragment>
          <Step1 form={form}/>
          <Button onClick={next}>下一步</Button>
        </Fragment>
      }
      {
        step === 1 && <Fragment>
          <Step2/>
        </Fragment>
      }
      {
        step === 2 && <Fragment>
          <Step3/>
        </Fragment>
      }
    </Fragment>
  );
};
export default index;
