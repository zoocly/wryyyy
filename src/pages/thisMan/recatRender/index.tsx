import React, { useEffect, useMemo, useState } from 'react';
import {Divider} from 'antd';
import Son from './comp/son';
import {awsl} from 'src/pages/services/login';
export default function index() {
  const getInitCount = () => {
    return 1
  };
  const [count, setCount] = useState<number>(getInitCount);
  const [time, setTime] = useState<any>('init time');
  const [number,setNumber] = useState(0);

  // 减少 render 的次数 类组件可以使用 shouldComponentUpdate 或 PureComponent，函数组件可以利用高级组件的特性或者 React.memo
  // 对组件进行合理的拆分

  useEffect(()=>{
    // useEffect只能获取到 count 和 time 的变化，并不能拦截
    console.log(count,time,' useEffect ');
  },[count,time]);
  const Child = () => {
    // 父组件自己刷新，子组件props不变也要刷新:
    console.log("render other child");
    return <div>child</div>;
  };
  const getAPI = async () => {
    const {data:{ a = undefined, b = undefined }={}} = await awsl({});
    setCount(a);
  };
  const alertNumber = () =>{
    /*
    * 每次渲染都是独立的闭包
      每一次渲染都有它自己的 Props 和 State
      每一次渲染都有它自己的事件处理函数
      当点击更新状态的时候，函数组件都会重新被调用，那么每次渲染都是独立的，取到的值不会受后面操作的影响
    *
    * */
    setTimeout(()=>{
      // alert 只能获取到点击按钮时的那个状态
      console.log(number);
    },3000);
  };
  return (
    <div>
      <button onClick={()=>{setCount(count=>count)}}>点我</button>
      <button onClick={()=>{setTime(new Date().getTime())}}>time</button>
      <button onClick={getAPI}>getAPI</button>
      {
        useMemo(()=>{
          // 可以使用在组件外部来控制只有那些参数变化才触发组件的渲染,但是里面不能async来请求
          console.log('render son out');
          return (
            <Son a={count}>{time}</Son>
          )
        },[count,time])
      }
      <Child/>
      <Divider/>
      <div>
        <p>{number}</p>
        <button onClick={()=>setNumber(number+1)}>+</button>
        <button onClick={alertNumber}>alertNumber</button>
      </div>
    </div>
  )
}
