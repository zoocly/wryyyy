import React, { Fragment, useEffect, useImperativeHandle, useState } from 'react';
import { Modal, Input, Table } from 'antd';
import ListTable from '@/components/ListTable';
import ListPagination from '@/components/ListPagination';
import request from "@/utils/request.js";
import qs from 'qs';
import isEmpty from 'lodash/isEmpty';
import _uniqBy from 'lodash/uniqBy';
function index(props:any,ref:any){
  const {
    action = '',
    payload = {}, //内部的table表额外请求参数
    method = 'POST',
    hasOwnShowComp = false,
    title,
    columns,
    searchNode,
    rowSelectionType = 'radio',
    hasPagination = true,
    inputValueRender = undefined, //input回显方法，需要返回string
    initValue = [], // [{name(举例):外部input回显,rowKey(举例):内部table选择初始化}]
    rowKey = 'code',
    renderTableQuery = undefined //内部table表返回数据的处理，需要返回list = [], pagination = {}
  } = props;
  const [ visible, setVisible ] = useState(false);
  const [ confirmLoading, setConfirmLoading ] = useState(false);
  const [ list, setList ] = useState([]);
  const [ pagination , setPagination ] =  useState({pageSize: 10, total: 0, page: 1});
  const [ tableLoading , setTableLoading ] =  useState(false);
  const [ selectedRowKeys, setSelectedRowKeys ] = useState<Array<any>>([]);
  const [ selectedItems, setSelectedItems ] = useState<Array<any>>([]);
  const [ inputValue, setInputValue ] = useState<string>('');
  const [ query, setQurey ] = useState(undefined); // 使用open时，需要额外传值的

  useEffect(()=>{
    // 初始化rowSelection
    if(!isEmpty(initValue)){
      let keys = initValue.map((item:any)=>{return item[rowKey]});
      setSelectedItems(initValue);
      setSelectedRowKeys(keys);
      setInputValueFunc({selectedRowKeys:keys,selectedItems:initValue});
    }
  },[JSON.stringify(initValue),visible]);
  const getList = (pageNum:number,pageSize = 10) =>{
    const requestRes=(res:any)=>{
      const { code = 500,list = [], pagination = {} } = res || {};
      setTableLoading(false);
      if(code === 0){
        if(renderTableQuery){
          const { list = [], pagination = {} } = renderTableQuery(res);
          setList(list);
          setPagination(pagination);
        }else {
          setList(list);
          setPagination(pagination);
        }
      }
    };
    let data = {
      pageNum,
      pageSize,
      ...payload,
    };
    let body = {
      data
    };
    setTableLoading(true);
    if(action){
      switch (method) {
        case 'POST':
          request(action,{
            method,
            body,
          }).then((res:any)=>requestRes(res));
          break;
        case 'Get':
          request(`${action}?${qs.stringify(data)}`,{
            method,
          }).then((res:any)=>requestRes(res));
          break;
      }
    }
  };
  useEffect(()=>{
    if(visible){
      getList(1);
    }
    return ()=>{
      if(visible){
        setList([]);
        setPagination({pageSize: 10, total: 0, page: 1});
        setSelectedRowKeys([]);
        setSelectedItems([]);
      }
    }
  },[visible]);
  const handleOk = async () =>{
    const {onSubmit} = props;
    setConfirmLoading(true);
    const resCode = await onSubmit({selectedRowKeys,selectedItems,query});
    setConfirmLoading(false);
    if(!hasOwnShowComp){
      setInputValueFunc({selectedRowKeys,selectedItems});
    }
    resCode === 0 && handleCancel();
  };
  const handleCancel=()=>{
    setVisible(false);
  };
  useImperativeHandle(ref, () => ({
    open:(query:any)=>{ open();setQurey(query)},
    clear:()=>{ clear() }
  }));
  const open=()=>{
    setVisible(true);
  };
  const onPageChange=(page:number)=>{
    getList(page);
  };
  const onSelectChange=(keys:Array<any>,rows:Array<any>)=>{
    const {onChange}=props;
    let finalKeys = [];
    let finalRows = [];
    if(!isEmpty(keys)){
      finalKeys = keys;
      finalRows = _uniqBy([...selectedItems,...rows],rowKey).filter(it => keys.includes(it[rowKey]));
    }
    setSelectedRowKeys(finalKeys);
    setSelectedItems(finalRows);
    onChange && onChange(finalRows);
  };
  const {page,pageSize} = pagination;
  let final = [
    {
      title:'序号',
      dataIndex:'num',
      width:60,
      align: 'center',
      render:(text:string,record:object,index:number)=>{
        if(!hasPagination){
          return index+1
        }
        return (page-1)*pageSize+index+1
      }
    },
    ...columns
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type:rowSelectionType,
  };
  const setInputValueFunc = ({selectedRowKeys = [], selectedItems = []}:any = {}) =>{
    let val:string = '';
    if(inputValueRender){
      val = selectedItems.map((it:object)=>{
        return inputValueRender(it)
      }).toString();
      setInputValue(val);
    }
  };
  const clear = () =>{
    setInputValue('');
    setSelectedItems([]);
    setSelectedRowKeys([]);
  };
  return (
    <Fragment>
      {
        !hasOwnShowComp &&
        <Input onClick={open} value={inputValue}/>
      }
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        destroyOnClose={true}
        confirmLoading={confirmLoading}
      >
        { searchNode && searchNode }
        {
          hasPagination ?
            <Fragment>
              <ListTable rowSelection={rowSelection} rowKey={record=>record[rowKey]} loading={tableLoading} columns={final} data={list} />
              <ListPagination pagination={pagination} onChange={onPageChange}/>
            </Fragment> :
            <Fragment>
              <Table rowSelection={rowSelection} rowKey={record=>record[rowKey]} columns={final} dataSource={list} bordered={true}/>
            </Fragment>
        }
      </Modal>
    </Fragment>
  )
}
export default React.forwardRef(index);

