import React from 'react';
import ListTable from 'components/ListTable';
import {createPostXHR,createXHR} from './config';
import {login, list} from 'src/pages/services/login';
import _get from 'lodash/get';
export default class index extends React.Component<any, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      pagination:{
        pageSize:10,
        page:1
      },
      list:[]
    };
  }
  componentDidMount(): void {
    this.getList();
  }
  getList = async () => {
    const {data: {records = []} = {}} = await list({});
    this.setState({list:records})
  };
  onClickGet = () => {
    createXHR();
  };
  onClickPost = () => {
    createPostXHR();
  };
  onClickOther = async () => {
    const res = await login({});
  };
  onPageChange = () => {

  };
  render(): React.ReactNode {
    const { pagination, list } = this.state;
    const columns=[
      {
        title:'案件名称',
        dataIndex:'name',
        width:160,
        align: 'center',
      },
      {
        title:'授权码',
        dataIndex:'currencyCode',
        width:160,
        align: 'center',
      },
      {
        title:'操作',
        dataIndex:'action',
        width:100,
        align: 'center',
        render:(text:string,record:object)=>{
          return (
            <div>
              <a>详情</a>
            </div>
          )
        },
      },
    ];
    return (
      <div>
        <button onClick={this.onClickGet}>点我get</button>
        <br/>
        <br/>
        <button onClick={this.onClickPost} >点我post</button>
        <br/>
        <br/>
        <button onClick={this.onClickOther} >走其他</button>
        <div>
          <ListTable columns={columns} data={list} pagination={pagination} onPageChange={this.onPageChange}/>
        </div>
      </div>
    );
  }
}
