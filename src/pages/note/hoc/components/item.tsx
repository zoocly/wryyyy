import React from 'react';
/*
* 此为通过属性代理
* 对比原生组件增强的项
* 1 可操作所有传入的props
* 2 可操作组件的生命周期
* 3 可操作组件的static方法
* 4 获取refs
* */
const index = (WrappedComponent:React.ReactNode) =>{
  return () =>{
    return (
      <div>
        <div>123478</div>
        <WrappedComponent/>
      </div>
    )
  }
};
export default index;
