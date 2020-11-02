import React, { Fragment } from 'react';
import { Divider } from 'antd';
import { history } from 'umi';

const index = () =>{
  const turnToDeep = () =>{
    history.push('/note/deep')
  };
  return (
    <div>
      <h1>原生JS 与 ES6的区别 笔记</h1>
      <Divider orientation={'left'}>for循环中的小知识</Divider>
      原生js中的for循环。 break为跳出该循环，continue 为跳出该次循环，循环还是要继续。<br/>
      如果使嵌套for循环，想要用break跳出全部循环，则需要使用label标签，在最外层循环写上自定义label xxx<br/>
      在想要跳出循环的地方 写 break xxx
      <Divider orientation={'left'}>function</Divider>
      普通函数和箭头函数的传参不一样：<br/>
      普通函数在小括号不写参数，在函数体也可以使用arguments的数组来代替，但箭头函数必传，虽然有arguments但是没想要的参数，如图<br/>
      <img src={require('@/assets/function.png')}/>
      <Divider orientation={'left'}>复制变量</Divider>
      <a onClick={turnToDeep}>原来的深浅复制</a>
      <Divider orientation={'left'}>作用域</Divider>
      原生js var是没有块作用域的（ps:块作用域就是有｛｝包住的部分）这样会很容易出错<br/>
      但是ES6中的let 和 const 是有的块作用域
      <Divider orientation={'left'}>数组</Divider>
      章节 5.2.2 转换方法 toString，书上介绍的方法和浏览器自己写的，结果不一样，不知道原因。<br/>
      栈方法<br/>
      push 和 pop 都是在数组最后端做操作，前者从最后推入N个元素，后者为删掉最后一个元素 <br/>
      若用一个变量接受 push为当前长度， pop为被删除元素。 注意：使用此方法，原数组已被修改<br/>
      栈方法的访问规则是 后进先出<br/>
      队列方法<br/>
      unshift 和 shift 都是在数组最前端做操作， 前者从最前放入N个元素， 后者为删除最前的一个元素<br/>
      若用一个变量接受 unshift 为当前长度， shift 为被删除元素。 注意：使用此方法，原数组已被修改<br/>
      栈方法的访问规则是 先进先出<br/>
    </div>
  )
};
export default index;

