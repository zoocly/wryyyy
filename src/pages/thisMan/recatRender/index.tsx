import React, {useState} from 'react';
import Son from './comp/son';
export default function index() {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      父组件自己刷新，子组件props不变也要刷新:{count}
      <button onClick={()=>{setCount(count + 1)}}>点我</button>
      <Son a={'1'}/>
    </div>
  )
}
