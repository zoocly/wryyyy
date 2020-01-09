import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Table } from 'antd';
import { TableEventListeners } from 'antd/lib/table';
interface propsType{
  columns:Array<object>,
  data:Array<object>,
  rowKey?:any,
  className?:string,
  scroll?:object,
  loading?:boolean,
  onRow?:(record: object, index: number)=>TableEventListeners,
  rowSelection?:object,
  rowClassName?:(record:any, index:number)=>string,
  components?:any,
  pagination?:object | boolean,
  onPageChange?:(page:number,pageSize:number)=>void,
}
export default function index(props:propsType) {
  let {columns,data,rowKey,className,scroll=undefined,loading,onRow,rowSelection,rowClassName,components,pagination} = props;
  const [ pageSize, setPageSize ] = useState<number>(10);

  const onChange=(page:number,pageSize:number)=>{
    const { onPageChange } = props;
    setPageSize(pageSize);
    onPageChange && onPageChange(page,pageSize);
  };
  const onShowSizeChange=(page:number, size:number)=>{
    const { onPageChange } = props;
    let lastPage = page;
    if(typeof pageSize !== 'number'){
      lastPage = 1
    }else{
      lastPage= pageSize !== size ? 1 : page
    }
    onPageChange && onPageChange(lastPage, size);
  };

  const defaultPagination={
    current:1,
    pageSize:10,
    total:0,
    size:'small',
    showSizeChanger:false,
    showTotal:(total:number)=>`共 ${total} 条`,
    onChange:onChange,
    onShowSizeChange:onShowSizeChange,
  };
  if(columns.length>0) {
    for (let obj of columns) {
      if (!obj.hasOwnProperty('key')) {
        // @ts-ignore
        obj['key'] = obj['dataIndex']
      }
    }
  }
  if(typeof pagination==='object'){
    pagination={...defaultPagination,...pagination};
  }

  return (
    <Table
      bordered={true}
      onRow={onRow}
      rowSelection={rowSelection}
      className={className ? `${className} ${styles.mytable}` : styles.mytable}
      columns={columns}
      dataSource={data}
      rowKey={rowKey ? rowKey : (record, index) => `${index}`}
      //@ts-ignore
      pagination={pagination}
      scroll={scroll}
      loading={loading}
      rowClassName={rowClassName}
      components={components}
      size={'middle'}
    />
  )
}
