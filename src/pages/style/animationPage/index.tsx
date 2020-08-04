import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
function debounce(fn, ms) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null;
    }, ms);
  }
}

function useDebounce(fn, time) {
  return debounce(fn, time);
}
export default function index() {
  const timer = useRef();
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  // const handleClick = useDebounce(function() {
  //   setCounter1(counter1 + 1)
  // }, 500)
  const handleClick = () =>{
    if(timer.current){
      clearTimeout(timer.current);
      timer.current = null;
    }
    const id = setTimeout(function() {
      setCounter1(counter1 + 1)
    },500);
    timer.current = id;
  };
  // // 补充一个函数，加载后会自动更新counter2的数值
  // useEffect(function() {
  //   const t = setInterval(() => {
  //     setCounter2(x => x + 1)
  //   }, 500);
  //   return () => clearInterval(t)
  // }, []);


  return (
    <div style={{ padding: 30 }}>
      <Button
        onClick={function() {
          handleClick()
        }}
      >click</Button>
      <div>{counter1}</div>
      <div>{counter2}</div>
    </div>
  )
}
