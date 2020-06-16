import React, { Fragment } from 'react';
export default function index() {
  const info = {
    name: 'jack',
    sex: '男',
    age: '28',
    phone: '13888888888',
    address: '广东省广州市',
    duty: '总经理'
  };
  let names = new Map([
    ['name','姓名'],
    ['age','年龄'],
    ['sex','性别'],
    ['phone','手机号'],
    ['address','家庭住址'],
    ['duty','职位']
  ]);
  const item = (name:string,value:any) =>{
    return (
      <div key={name}>
        <span>{names.get(name)}</span>:<span>{value}</span>
      </div>
    )
  };
  const renderItem = () =>{
    let arr:Array<any> = [];
    for(let k in info){
      arr.push( item(k,info[k]) );
    }
    return arr
  };

  return (
    <Fragment>
      <h1>使用map来实现键值对的匹配,完成个人信息的需求</h1>
      {renderItem()}
      <img src={require('@/assets/map&set.png')}/>
    </Fragment>
  )
}
