import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Button, Form, Steps, Table } from 'antd';
import { selfRowSelection } from '@/components/AntDTableRowSelection';
import CountdownHook from './components/countdown/wayHook';
import Step1 from './components/step1';
import Step2 from './components/step2';
import Step3 from './components/step3';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const { Step } = Steps;
const index = () => {
  const [step, setStep] = useState(0);
  const stepValueRef = useRef({ step1: {}, step2: {}, step3: {} });
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<any>([]);

  const next = () => {
    form.validateFields().then(async values => {
      stepValueRef.current.step1 = values;
      setStep(e => e + 1);
    });
  };

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const rowSelection = {
    ...selfRowSelection({
      selectedRowKeys,
      setSelectedRowKeys,
      setSelectedItem,
      selectType: 'checkbox',
      rowKey: 'key',
    }),
  };

  useEffect(() => {
    console.log(selectedRowKeys, selectedItem, 'selectedItem');
  }, [selectedItem]);
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

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </Fragment>
  );
};
export default index;
