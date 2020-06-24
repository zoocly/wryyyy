import React from 'react';
import Cards from 'components/OverViewCard';
import FormComp from './comp/form';
import FormComp2 from './comp/form2';
import _set from 'lodash/set';
import _get from 'lodash/get';
import {cardConfig, chartConfig} from './config';
import { Button } from 'antd';
export default class index extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = {
      val:0
    };
  }
  componentDidMount() {
    /*
    *
    * 1、第一次和第二次都是在 react 自身生命周期内，触发时 isBatchingUpdates 为 true，所以并不会直接执行更新 state，而是加入了 dirtyComponents，所以打印时获取的都是更新前的状态 0。

      2、两次 setState 时，获取到 this.state.val 都是 0，所以执行时都是将 0 设置成 1，在 react 内部会被合并掉，只执行一次。设置完成后 state.val 值为 1。

      3、setTimeout 中的代码，触发时 isBatchingUpdates 为 false，所以能够直接进行更新，所以连着输出 2，3。
*/
    // this.setState({val: this.state.val + 1});
    // console.log(this.state.val);    // 第 1 次 log
    //
    // this.setState({val: this.state.val + 1});
    // console.log(this.state.val);    // 第 2 次 log
    //
    // setTimeout(() => {
    //   this.setState({val: this.state.val + 1});
    //   console.log(this.state.val);  // 第 3 次 log
    //
    //   this.setState({val: this.state.val + 1});
    //   console.log(this.state.val);  // 第 4 次 log
    // }, 0);
  }

  render(): React.ReactNode {
    return (
      <div>
        {/*<Button onClick={()=>{_get(this,'Cards.open',()=>{})()}}>编辑</Button>*/}
        {/*<Cards ref={e=>_set(this,'Cards',e)}*/}
               {/*cardConfig={cardConfig}*/}
               {/*chartConfig={chartConfig}*/}
               {/*chartType={'memOverview'}*/}
        {/*/>*/}
        <FormComp/>
        <FormComp2/>
      </div>
    );
  }
}
