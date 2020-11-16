import React from 'react';
import { Divider } from 'antd';
import { history as umiHistory } from 'umi';
import DLC from '../dlc';

const index = () => {
  const turnToDeep = () => {
    umiHistory.push({
      pathname: '/note/deep',
      query: {
        a: 'b',
      },
    });
  };
  return (
    <div>
      <h1>原生JS 与 ES6的区别 笔记</h1>

      <Divider orientation={'left'}>for循环中的小知识</Divider>
      原生js中的for循环。 break为跳出该循环，continue 为跳出该次循环，循环还是要继续。<br />
      如果使嵌套for循环，想要用break跳出全部循环，则需要使用label标签，在最外层循环写上自定义label xxx<br />
      在想要跳出循环的地方 写 break xxx

      <Divider orientation={'left'}>function</Divider>
      普通函数和箭头函数的传参不一样：<br />
      普通函数在小括号不写参数，在函数体也可以使用arguments的数组来代替，但箭头函数必传，虽然有arguments但是没想要的参数，如图<br />
      <img src={require('@/assets/function.png')} />

      箭头函数和普通函数的this不一样：<br />
      es5 中的this，永远指向最后调用它的那个对象。<br />
      箭头函数中的this，箭头函数的 this 始终指向函数定义时的 this，而非执行时（会往上一直找，找到离他最近的this，来当作箭头函数的this）<br />
      箭头函数中的this，会改变原本this指向，可以理解成call改变this一样（只是单纯的改变了this的指向，原理并不一样）

      <Divider orientation={'left'}>复制变量</Divider>h
      <a onClick={turnToDeep}>原来的深浅复制</a>

      <Divider orientation={'left'}>作用域</Divider>
      原生js var是没有块作用域的（ps:块作用域就是有｛｝包住的部分）这样会很容易出错<br />
      但是ES6中的let 和 const 是有的块作用域

      <Divider orientation={'left'}>数组</Divider>
      章节 5.2.2 转换方法 toString，书上介绍的方法和浏览器自己写的，结果不一样，不知道原因。<br />
      栈方法<br />
      push 和 pop 都是在数组最后端做操作，前者从最后推入N个元素，后者为删掉最后一个元素 <br />
      若用一个变量接受 push为当前长度， pop为被删除元素。 注意：使用此方法，原数组已被修改<br />
      栈方法的访问规则是 后进先出<br />
      队列方法<br />
      unshift 和 shift 都是在数组最前端做操作， 前者从最前放入N个元素， 后者为删除最前的一个元素<br />
      若用一个变量接受 unshift 为当前长度， shift 为被删除元素。 注意：使用此方法，原数组已被修改<br />
      栈方法的访问规则是 先进先出<br />

      <Divider orientation={'left'}>构造函数</Divider>
      构造函数也是一般的函数，但是开头是大写，调用构造函数会经过4步<br />
      1.创建一个新对象<br />
      2.将this指向新对象（将构造函数的作用域赋给新对象）<br />
      3.执行函数体的内容<br />
      4.返回新对象<br />
      例如：<br />
      const person1 = new Person(); const person2 = new Person();<br />
      person1 和 person2 的 constructor，都指向Person： person1.constructor = Person; person2.constructor = Person;<br />
      但是构造函数有缺点，若Person中包含方法a，那么person1.a === person2.a // false （2个方法a并不是同一个Function的实例）<br />
      原因是因为在执行构造函数的内容时，会申明一个新的方法（new Function()）,虽然在逻辑上是等价的，但是实质不一样

      <Divider orientation={'left'}>继承</Divider>
      js的继承主要是依靠原型链来继承的，其中分为了几种继承方式，分别是<br />
      1.原型链继承：<br />
      sub.prototype = new Sup() sub的原型对象是sup的构造函数Sup<br />
      可以在子类实例中看到继承的父级<br />
      缺点：子修改被继承的数据，子2也会相应的被修改。<br />
      2.构造函数继承(经典继承)：<br />
      在子中使用apply() 或 call() 来执行父的构造函数，可以解决 1 中的缺点<br />
      此方法并不那个能在子类实例的__proto__中呈现继承的父级，也就是说 子类实例直接继承Object了<br />
      缺点：无法函数复用。在超类型的原型中定义方法，无法在子类中不可见<br />
      3.组合继承(伪经典继承):<br />
      将原型链和构造函数组合，也就是将 1 和 2 组合使用。可以解决 2 中的缺点<br />
      可以在子类实例中看到继承的父级<br />
      缺点：会调用2次构造函数 第一次：Sub.prototype = new Sup()。第二次：Sup.call(this)<br />
      4.原型式继承<br />
      创建一个方法a，在方法里面创建临时构造函数F()，F.prototype = 方法传入的对象obj，最后return new F(); <br />
      不能在子类实例中看到继承的父级<br />
      缺点：使用a创建的对象将obj作为原型，obj的属性将被子类共享以，若子1 修改属性，obj和子2都会被修改属性（相当于是浅复制）<br />
      5.寄生式继承<br />
      由 4 升级而成，创建方法a，方法里克隆obj，添加属性，返回克隆对象。<br />
      缺点：不能函数复用<br />
      6.寄生组合继承<br />
      通过构造函数来继承属性，通过原型链来继承方法<br />
      创建方法f，传入sub和sup，let aa = 使用 4 中的方法a(sup.prototype); aa.constructor = sub; sub.prototype = aa;<br />
      可以在子类实例中看到继承的父级<br />

      <Divider orientation={'left'}>BOM</Divider>
      移动窗口和重新设置窗口大小 window.resizeTo() window.moveTo() 没效果
      窗口大小<br />
      window.innerWidth 实际浏览器内容宽 window.outerWidth 实际浏览器宽度<br />
      window.innerHeight 实际浏览器内容高 window.outerHeight 实际浏览器高度<br />
      在ie8之前，使用DOM中的 document.documentElement.clientHeight 实际内容高 document.documentElement.clientWidth 实际内容宽<br />
      跳转新窗口<br />
      let a = window.open(); 若a == null， 则说明浏览器拦截了弹出式窗口<br />
      setTimeOut定时器可以牵扯到队列宏任务微任务以及promise().then()的顺序<br />
      使用定时器可以用作前端防抖和限流的应用当中<br />
      BOM中还有2个对象，分别是screen和history，浏览器自带的这2个对象的用处不是很大<br />
      但是现在前端框架大都自己会封装history，比如umi的history路由跳转和取url上面的参数等<br />
      还有一个navigator，是来查看浏览器参数和版本等等<br />

      <Divider orientation={'left'}>DOM</Divider>
      原生JS和使用JQ的JS，改变数据都是通过DOM来更改的HTML，不像现在react和vue的前端框架使用数据来驱动页面的变化<br />
      因为操作DOM来更改页面，消耗的性能代价太大，所以被现在框架舍弃。<br />
      如果想知道一个节点是不是元素（分为12种节点，元素节点的值为1），可以使用someNode.nodeType == 1 来判断<br />
      DOM中很多操作，都可以使用jq来替换使用，所以接下来可以看JQ的东西来补充。<br />
      DOM2 和 DOM3 是扩展DOM的API：<br />
      在DOM2中，可以使用 元素.style.color = 'red' 来对css进行控制
      <DLC />
    </div>
  );
};
export default index;

