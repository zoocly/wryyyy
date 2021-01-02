import React, { useContext } from 'react';
const data = {
  a:1234,b:4567
};
const SelfContext = React.createContext({});
const Parent = () =>{
  return (
    <div>
      <Child/>
    </div>
  )
};
const Child = () =>{
  /*
  * 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定
  * 跟原来的context 基本类似，parent包上provider以及value，传给N层以下的child，用context来接收value
  * */
  const context = useContext(SelfContext);
  return (
    <div>
      {JSON.stringify(context)}
    </div>
  )
};
const index = () =>{
  return (
    <div>
      <SelfContext.Provider value={data}>
        <Parent/>
      </SelfContext.Provider>
    </div>
  )
};
export default index;
