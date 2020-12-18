import React from 'react';
const index =()=>{
  return (
    <div>
      <pre>
        React15架构可以分为两层：
        1.Reconciler（协调器）—— 负责找出变化的组件
        2.Renderer（渲染器）—— 负责将变化的组件渲染到页面上，进行递归更新

        this.setState、this.forceUpdate、ReactDOM.render来触发协调器更新：
        (1) 通过组件的render转换虚拟DOM
        (2) 新旧虚拟DOM对比找出变化
        (3) 通知渲染器更新(有3个地方要更新，在1处先对比渲染，在去2处对比渲染，最后到3处，同步进行)

        递归更新的缺点：
        由于递归执行，所以更新一旦开始，中途就无法中断。
        当层级很深时，递归更新时间超过了16ms就有卡顿(主流浏览器刷新频率为60Hz，即每（1000ms / 60Hz）16.6ms浏览器刷新一次)
        解决办法：将同步的更新变为可中断的异步更新。

        React15架构不能支撑异步更新以至于需要重构
      </pre>
      <pre>
        React16架构
        1.Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
        2.Reconciler（协调器）—— 负责找出变化的组件
        3.Renderer（渲染器）—— 负责将变化的组件渲染到页面上

        Scheduler：重写了个新的 requestIdleCallback
        Reconciler:从递归变成了可以中断的循环过程。每次循环都会调用shouldYield判断当前是否有剩余时间。

        在React16中，Reconciler与Renderer不再是交替工作。
        当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记

        由于Scheduler和Reconciler在内存中进行，所以不会更新dom，执行完毕后，才更新dom

        Reconciler内部采用了Fiber的架构
        代数效应是函数式编程中的一个概念，用于将副作用从函数调用中分离。

      </pre>
    </div>
  )
}
export default index;
