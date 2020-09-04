import React, { Fragment } from 'react';
import { Divider } from 'antd';
import A from './components/item';
import B from './components/item2';
import ListTable from '@/components/ListTable';
const Page = B(ListTable);
const index = () =>{
  return (
    <div>
      12345
      {/*<Page/>*/}
      <Divider orientation={'left'}>HOC的实际应用</Divider>
      <div>
        1.日志打点
      </div>
      <img src={require('@/assets/hoc_img1.png')}/>
      <div>
        2.权限控制
        <img src={require('@/assets/hoc_img2.png')}/>
      </div>
    </div>
  )
};
/*
* hoc，通过一个函数A，传入一个Component，返回一个新的Component
* 告诫—不要在render方法内使用高阶组件
* 约定-不要改变原始组件
* 约定-透传不相关的props:使用高阶组件，我们可以代理所有的props，但往往特定的HOC只会用到其中的一个或几个props。我们需要把其他不相关的props透传给原组件
*
* HOC的出现可以解决这些问题
* 1 高阶组件就是一个没有副作用的纯函数，各个高阶组件不会互相依赖耦合
* 2 高阶组件也有可能造成冲突，但我们可以在遵守约定的情况下避免这些行为
* 3 高阶组件并不关心数据使用的方式和原因，而被包裹的组件也不关心数据来自何处。高阶组件的增加不会为原组件增加负担
* HOC的缺陷
* 1 HOC需要在原组件上进行包裹或者嵌套，如果大量使用HOC，将会产生非常多的嵌套，这让调试变得非常困难。
* 2 HOC可以劫持props，在不遵守约定的情况下也可能造成冲突。
* */
export default A(index);



