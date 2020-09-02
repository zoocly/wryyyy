import React, { useEffect } from 'react';
import { Divider } from 'antd';
const index = () =>{

  return (
    <div>
      <Divider orientation={'left'}>Unknown 类型</Divider>
      <p>就像所有类型都可以赋值给 <code>any</code>，所有类型也都可以赋值给 <code>unknown</code>。这使得 <code>unknown</code> 成为 TypeScript 类型系统的另一种顶级类型（另一种是 <code>any</code>）。下面我们来看一下 <code>unknown</code> 类型的使用示例：</p>
      <p><code>unknown</code> 类型只能被赋值给 <code>any</code> 类型和 <code>unknown</code> 类型本身。直观地说，这是有道理的：只有能够保存任意类型值的容器才能保存 <code>unknown</code> 类型的值。毕竟我们不知道变量 <code>value</code> 中存储了什么类型的值。</p>
      <Divider orientation={'left'}>Tuple 类型</Divider>
      <p>元组可用于定义具有有限数量的未命名属性的类型。每个属性都有一个关联的类型。使用元组时，必须提供每个属性的值。为了更直观地理解元组的概念，我们来看一个具体的例子：</p>
      let tupleType: [string, boolean];
      tupleType = ["Semlinker", true];
      <Divider orientation={'left'}>TypeScript 断言</Divider>
      <p>有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。</p>
      let someValue: any = "this is a string";
      let strLength: number = (someValue as string).length;



    </div>
  )
};
export default index;
