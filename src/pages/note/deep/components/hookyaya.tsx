import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Divider } from 'antd';
export default function hookyaya() {
  const example = () =>{
    /*
    * react hook每一帧拥有独立的变量,每一帧拥有独立的状态,
    * 所以在setTimeout时,已经像照相机一样把当时的exampleCount保存下来了,所以+1时,就是那时的exampleCount+1
    * */
    const [exampleCount, setExampleCount] = useState(0);
    const handleClick = () => {
      setTimeout(() => {
        setExampleCount(exampleCount + 1);
      }, 3000);
    };
    return (
      <div>
        <p>{exampleCount}</p>
        <button onClick={() => setExampleCount(exampleCount + 1)}>
          setCount
        </button>
        <button onClick={handleClick}>
          Delay setCount
        </button>
      </div>
    );
  };
  const example2 = () => {
    /*
    * useRef可以获取当时的准确值,没有延迟
    * */
    const [exampleCount2, setExampleCount2] = useState(0);
    const currentCount = useRef(exampleCount2);
    currentCount.current = exampleCount2;
    const handleClick = () => {
      setTimeout(() => {
        setExampleCount2(currentCount.current + 1);
      }, 3000);
    };
    return (
      <div>
        <p>{exampleCount2}</p>
        <button onClick={() => setExampleCount2(exampleCount2 + 1)}>
          setCount
        </button>
        <button onClick={handleClick}>
          Delay setCount
        </button>
      </div>
    );
  };
  const example3 = () => {
    /*
    *  useRef也可以获取过去的值
    * */
    const [count, setCount] = useState(1);
    const prevCountRef = useRef(1);
    /*
    * 下面2句话是获取过去值的关键
    * 首先声明过去值 prevCount
    * 然后在用 prevCountRef 赋新值
    * */
    const prevCount = prevCountRef.current;
    prevCountRef.current = count;

    const handleClick = () => {
      setCount(prevCount + count);
    };
    return (
      <div>
        <p>prevCount: {prevCount} , count: {count}</p>
        <button onClick={handleClick}>SetCount</button>
      </div>
    );
  };
  const example4 = () =>{
    const [count, setCount] = useState(0);
    useEffect(() => {
      setTimeout(() => {
        console.log(`You clicked ${count} times`);
      }, 3000);
    });
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  };
  const example5 = () =>{
    const [count, setCount] = useState(0);
    /*
    * 如果我们频繁修改 count，每次执行 Effect，上一次的计时器被清除，需要调用 setInterval 重新进入时间队列，实际的定期时间被延后，甚至有可能根本没有机会被执行。
    * 所以有一个最佳实践：状态变更时，应该通过 setState 的函数形式来代替直接获取当前状态。
    * */
    useEffect(() => {
      const id = setInterval(() => {
        setCount(c => c + 1); // ✅ 在这不依赖于外部的 `count` 变量
      }, 1000);
      return () => clearInterval(id);
    }, []); // ✅ 我们的 effect 不适用组件作用域中的任何变量
    return <h1>{count}</h1>;
  };
  const example6 = () =>{
    const [count, setCount] = useState(0);
    const data = useMemo(() => ({
      count,
      d: 'xxx'
    }), [count]);
    const onClick = () =>{
      setCount(v=>v+1);
      console.log(data,'ffff');
    };
    return (
      <div>
        <button onClick={onClick}> {count} 点我</button>
      </div>
    )
  };
  return (
    <Fragment>
      <h1>react hook 的 setState 和 setTimeOut 以及 useRef 的骚操作</h1>
      <a href="https://zh-hans.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often">官网Hooks FAQ</a>
      <br/>
      <a href="https://juejin.im/post/5ec7372cf265da76de5cd0c9#heading-2">React Hooks 最佳实践</a>
      {example()}
      {example2()}
      {example3()}
      {example4()}
      {example5()}
      {example6()}
    </Fragment>
  );
};
