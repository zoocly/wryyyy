import React from 'react';
/*
* 通过反向继承
* 对比原生组件增强的项
* 1 可操作所有传入的props
* 2 可操作组件的生命周期
* 3 可操作组件的static方法
* 4 获取refs
* 5 可操作state
* 6 可以渲染劫持
*
* 自己理解，可以通过外部修改的方式来修改一些组件的设置
* */
export default function inheritHOC(WrappedComponent:any) {
  return class extends WrappedComponent {
    render() {
      console.log(this,'this');
      return (
        <div>
          zxc
        </div>
      )
    }
  }
}






