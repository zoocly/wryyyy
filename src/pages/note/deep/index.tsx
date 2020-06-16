import React, { Fragment } from 'react';
import { Divider } from 'antd';
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
      <a href="https://juejin.im/post/59ac1c4ef265da248e75892b" target={'_blank'}>js 深拷贝 vs 浅拷贝</a> <br/>
      基本类型会指向不同的堆，引用类型会指向同一个堆的数据 <br/>
      1. 浅拷贝只能拷贝基本类型，所以解构不能拷贝 {JSON.stringify([{a:1}])} <br/>
      2. 引用拷贝：只能拷贝基本类型 <br/>
      concat.slice() 也是浅拷贝 <br/>
      Object.assign() 也是浅拷贝 <br/>
      JSON.stringify() 是内置的深拷贝 ，但是会有 正则 空方法 会漏掉的情况<br/>
      <Divider/>
      <h1>使用map来实现键值对的匹配,完成个人信息的需求</h1>
      {renderItem()}
      <img src={require('@/assets/map&set.png')}/>
    </Fragment>
  )
}
