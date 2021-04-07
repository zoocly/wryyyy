import React, { Fragment } from 'react';
import { Divider } from 'antd';
import MapSet from './components/mapSet';
import { ReactComponent as A } from '@/assets/test.svg';

export default function index() {
  return (
    <Fragment>
      <A/>
      <Divider />
      <a href="https://juejin.im/post/59ac1c4ef265da248e75892b" target={'_blank'}>js 深拷贝 vs 浅拷贝</a> <br />
      基本类型会指向不同的堆，引用类型会指向同一个堆的数据 <br />
      1. 浅拷贝只能拷贝基本类型，所以解构不能拷贝 {JSON.stringify([{ a: 1 }])} <br />
      2. 引用拷贝：只能拷贝基本类型 <br />
      concat() slice() 也是浅拷贝 。<br />
      Object.assign() 也是浅拷贝 <br />
      JSON.stringify() 是内置的深拷贝 ，但是会有 正则 空方法 会漏掉的情况<br />
      <Divider />

      <MapSet />

    </Fragment>
  );
}
