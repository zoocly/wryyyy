import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
const index = () =>{
  /*
  * 调度器：调度更新
    协调器：决定更新的内容
    渲染器：将更新的内容渲染到视图中

    协调器在编辑fiber时会形成链表effectList。

    协调器的工作流程是使用遍历实现的递归。
    effectList的构建发生在归阶段。 所以会有Child到Parent到App依次触发useEffect

    且useEffect在有deps变化时，会先触发return里面的东西
  * */
  const [ num, setNum ] = useState(0);
  useEffect(()=>{
    console.log('num',num);
    return ()=>{
      console.log('--------------------------')
      // setNum(0); // 不能在有deps的情况，destroy更新对应的state
    }
  },[num]);

  return (
    <div>
      {num} <Button onClick={()=>setNum(val=>val+1)}>+</Button>
    </div>
  )
};
export default index;
