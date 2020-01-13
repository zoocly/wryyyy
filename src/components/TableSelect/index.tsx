import React, { useEffect, useState, Fragment, forwardRef, useMemo } from 'react';
import TableComp from 'components/ListTable';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import {config} from './config';
import { Input, Modal } from 'antd';

interface selfConfigs {
  getResList:Function,
  inputValue:Function
}
interface Interface {
  title:string,
  columns:Array<any>,
  action:Function,
  payload:object,
  onChange?:Function,
  searchNode?:React.ReactNode,
  onSubmit?:Function,
  inputReturnKeyName?:string,
  initValueName?:string,
  selfConfig?:selfConfigs
}
const initPagination = {
  current:1, pageSize:10, total:0
};
function index(props:Interface,ref:any) {
  const {
    searchNode = <div/>,
    title = '点击选择',
    action = '',
    columns =[],
    payload = {},
    selfConfig = {},
    onSubmit = ()=>{}
  } = props;
  const [ visible , setVisible ] = useState<boolean>(false);
  const [ confirmLoading , setConfirmLoading ] = useState<boolean>(false);
  const [ tableLoading , setTableLoading ] = useState<boolean>(false);
  const [ list , setList ] = useState<Array<object>>([]);
  const [ pagination, setPagination ] = useState<any>(initPagination);
  const [ selectedRowKeys, setSelectedRowKeys ] = useState<any>([]);
  const [ selectedItems, setSelectedItems ] = useState<any>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(()=>{
    return () => {
      // 销毁
      if(visible){ // 在return外面visible是最新的值为true， 在里面是上一次的值
        setConfirmLoading(false);
        setTableLoading(false);
        setList([]);
        setPagination(initPagination);
        setSelectedRowKeys([]);
        setSelectedItems([]);
      }
    };
  },[visible]);
  const getList = async (pagination:any) => {
    if(typeof action === 'function'){
      setTableLoading(true);
      let finalPayload = {
        current:pagination.current,
        pageSize:pagination.pageSize,
        ...payload,
      };
      const res = await action(finalPayload);
      setTableLoading(false);
      // 使用自己或外部配置格式化列表数据
      // @ts-ignore
      const { resList = [], resPagination = {...initPagination} } = !_isEmpty(selfConfig) ? selfConfig.getResList(res) : config.getResList(res);
      setList(resList);
      setPagination(resPagination);
    }
  };
  const getFinalCol = () => {
    return [
      {
        title:'序号',
        dataIndex:'num',
        width:60,
        align: 'center',
        render:(text:string,record:object,index:number)=>{
          const {current,pageSize} = pagination;
          return (current-1)*pageSize+index+1
        }
      },
      ...columns,
    ];
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys:Array<any>,record:object)=>onSelectChange(selectedRowKeys,record),
    type:'radio',
  };
  const onSelectChange = (selectedRowKeys:Array<any>,record:object) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedItems(record);
  };
  const open = () => {
    getList(pagination);
    handleCancel();
  };
  const handleOk = () =>{
    // 使用自己或外部配置格式化input显示内容
    // @ts-ignore
    let val:string = !_isEmpty(selfConfig) ? selfConfig.inputValue(selectedItems) : config.inputValue(selectedItems);
    setInputValue(val);
    onSubmit && onSubmit(selectedItems);
    handleCancel();
  };
  const handleCancel = () =>{
    setVisible(val=>!val);
  };
  const onPageChange = async (page:number) => {
    getList({...pagination,current:page});
  };
  return (
    <Fragment>
      <Input onClick={open} value={inputValue}/>
      {
        useMemo(()=>{
          return <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
            maskClosable={false}
            destroyOnClose={true}
            confirmLoading={confirmLoading}
          >
            { searchNode && searchNode }
            <TableComp rowSelection={rowSelection}
                       rowKey={(record:any)=>record['code']}
                       loading={tableLoading}
                       columns={getFinalCol()}
                       data={list}
                       pagination={pagination}
                       onPageChange={onPageChange}
            />
          </Modal>
        },[visible,tableLoading,confirmLoading,list,selectedRowKeys,JSON.stringify(pagination)])
      }
    </Fragment>
  );
}
export default forwardRef(index);

