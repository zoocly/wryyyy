import React, { Fragment, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import TB from '@/components/TableSelect2021_06_25';

const FormComp = (props: any) => {
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  const { form, onFinish, addNew, query } = props;
  const tbRef:any = useRef();
  return (
    <div>
      <Form form={form} {...formItemLayout} onFinish={onFinish}>
        <Form.Item
          name={'name'}
          label={'姓名'}
          rules={[{ required: false, message: '请选择专业技术资格' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name={'position'}
          label={'职务'}
          rules={[{ required: false, message: '请输入职务' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name={'contactPhone'}
          label={'联系电话'}
          rules={[{ required: false, message: '请输入联系电话' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name={'zxc'}
          label={'vvvv'}
          rules={[{ required: false, message: '请输入联系电话' }]}
        >
          <TB ref={tbRef}
              columns={[]}
              title={'测试'}
              action={'/api/case/list'}
              method={'POST'}
              rowSelectionType={'checkbox'}
              initValue={[
                {
                  "id": 58,
                  "code": "c251371e-e336-4564-9e3e-52a1a153c99a",
                  "caseNum": "2019015",
                  "name": "刚发的",
                  "orgCode": "48749904-1bb7-4cb1-9e46-68ffd7d5c605",
                  "leader": "地方",
                  "caseMoney": "300.00",
                  "phone": "17781051196",
                  "remark": "32 ",
                  "createTime": "2019-12-24 17:13:28",
                  "orgName": "测试单位3",
                  "currencyCode": "001"
                },
              ]}
              renderTableQuery={(res: any) => {
                const { data: { records = [], current = 1, size = 10, total = 0 } = {} } = res;
                return { list: records, pagination: { pageSize: size, total: total, page: current } };
              }}
              renderSearch={({ list, query, selectedItems, selectedRowKeys,form, searchCallBack }: any) => {
                return (
                  <FormComp onFinish={searchCallBack} form={form}/>
                );
              }}
              onSearchCallBack={(val:any)=>{
                return val;
              }}
              onSubmit={({ selectedRowKeys, selectedItems, query }: any) => {
                console.log(selectedRowKeys, selectedItems, query);
                return 0;
              }}
              inputValueRender={(val:any)=>{
                return val.name;
              }}
              hasOwnShowComp={false}/>
        </Form.Item>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Button type={'primary'} onClick={() => {
            form.submit();
          }}>搜索</Button>
        </div>
      </Form>
    </div>
  );
};

const index = () => {
  const tbRef: any = useRef();
  return (
    <Fragment>
      <h1>sourceTree 的key</h1>
      <div>
        <div>
          <Button onClick={() => {
            tbRef.current.open();
          }}>怎么获取这个key，记一手</Button>
          <TB ref={tbRef}
              columns={[]}
              title={'测试'}
              action={'/api/case/list'}
              method={'POST'}
              rowSelectionType={'checkbox'}
              renderTableQuery={(res: any) => {
                const { data: { records = [], current = 1, size = 10, total = 0 } = {} } = res;
                return { list: records, pagination: { pageSize: size, total: total, page: current } };
              }}
              renderSearch={({ list, query, selectedItems, selectedRowKeys,form, searchCallBack }: any) => {
                return (
                  <FormComp onFinish={searchCallBack} form={form}/>
                );
              }}
              onSearchCallBack={(val:any)=>{
                return val;
              }}
              onSubmit={({ selectedRowKeys, selectedItems, query }: any) => {
                console.log(selectedRowKeys, selectedItems, query);
                return 0;
              }}
              hasOwnShowComp={true}/>
        </div>
        <img src={require('@/assets/instructions01.png')}/>
      </div>
      <div>
        <div>1.</div>
        <img src={require('@/assets/instructions02.png')}/>
      </div>
      <div>
        <div>2.生成</div>
        <img src={require('@/assets/instructions03.png')}/>
      </div>
      <div>
        <div>3.复制公钥到项目setting的SHH</div>
        <img src={require('@/assets/instructions04.png')}/>
        <img src={require('@/assets/instructions06.png')}/>
      </div>
      <div>
        最后把私钥放到第一个图中
        .0
      </div>
      <h1>gitBatKey 适配webstorm</h1>
      <div>
        {/*https://blog.csdn.net/duansamve/article/details/89343902*/}
        <div>
          1. 在setting中登录 github帐号
        </div>
        <div>
          2. 配置git.exe
        </div>
        <div>
          <br/> 3. ,打开git-bash，在控制台中输入以下命令。
          <br/>$ ssh-keygen -t rsa -C "youremail@example.com"
          <br/> ps : ssh-keygen是产生密钥，密钥有两种类型rsa和dsa两种，-t用来指定密钥类型，-t rsa是将密钥类型指定为rsa，-C是公钥中的备注，xxx
          通常指定为自己的邮箱，也可以输入其他。<br/>
          <br/> 首先，在windows下查看[c盘->用户->自己的用户名->.ssh]下是否有id_rsa、id_rsa.pub文件，如果有，取到id_rsa.pub内的key，然后登陆github，进入setting->SSH
          keys。
        </div>
      </div>
    </Fragment>
  );
};
export default index;
