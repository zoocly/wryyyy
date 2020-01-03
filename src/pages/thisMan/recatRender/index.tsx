import React, { useEffect, useMemo, useState } from 'react';
import Son from './comp/son';
import {awsl} from 'src/pages/services/login';
export default function index() {
  const [count, setCount] = useState<number>(0);
  const [time, setTime] = useState<any>('init time');
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

  // 减少 render 的次数 类组件可以使用 shouldComponentUpdate 或 PureComponent，函数组件可以利用高级组件的特性或者 React.memo
  // 对组件进行合理的拆分

  return (
    <div>
      <button onClick={()=>{setCount(count)}}>点我</button>
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
    </div>
  )
}
