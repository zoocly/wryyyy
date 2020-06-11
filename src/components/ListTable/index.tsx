import React from 'react';
import {Table} from 'antd';
import styles from './index.less';

interface propsType{
  columns:Array<object>,
  data:Array<object>,
  rowKey?:string,
  className?:string,
  scroll?:object,
  loading?:boolean,
  onRow?:(object:object)=>void,
  rowSelection?:object,
  rowClassName?:(record:any, index:number)=>string,
  components?:any,
  extendProps?: any,
}
export default class index extends React.Component<propsType,{}>{
  render(): React.ReactNode {
    const {columns,data,rowKey,className,scroll=undefined,loading,onRow,rowSelection,rowClassName,components, extendProps}=this.props;
    if(columns.length>0) {
      for (let obj of columns) {
        if (obj['key'] === undefined) {
          obj['key'] = obj['dataIndex']
        }
      }
    }
    return(
      <Table
        bordered={true}
        {...extendProps}
        onRow={onRow}
        rowSelection={rowSelection}
        className={className ? `${className} ${styles.mytable}` : styles.mytable}
        columns={columns}
        dataSource={data}
        rowKey={rowKey ? rowKey : (record, index) => `${index}`}
        pagination={false}
        scroll={scroll}
        loading={loading}
        rowClassName={rowClassName}
        components={components}
        size={'middle'}
      />
    );
  }
}
