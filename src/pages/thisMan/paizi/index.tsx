import React, { Fragment, useEffect } from 'react';
import './index.less';
class Index extends React.Component{
  render(){
    return <div>
      <ul>
        <li>react</li>
        <li>vue</li>
        <li>Angular</li>
      </ul>
    </div>
  }
}

function HOC (Component){
  return class Advance extends Component {
    render() {
      const element = super.render()
      console.log(element,'React.Children');
      const otherProps = {
        name:'alien'
      }
      const appendElement = <li>{otherProps.name}</li>
      const newchild =  React.Children.map(element.props.children.props.children,(child,index)=>{
        if(index === 2) return appendElement
        return  child
      })
      return  React.cloneElement(element, element.props, newchild)
    }
  }
}
export  default HOC(Index)



/*
* class组件和hook组件都可以互相嵌套HOC
* 但是嵌套之间的组件在生命周期会有些不同，比如：
* 外层是class 里层是hook，则会先执行componentDidmount 然后执行useEffect
* 外层是hook 里层是hook，则会先执行里层
*
*
* 无状态组件
* 可以理解为 react官方 想要的最纯粹的组件模式
* 其特点是不需要是不需要管理状态state，数据直接通过props传入
*
*
* 有状态组件
* 通常这种组件会有生命周期，有state状态管理，业务组件经常用到
* */
