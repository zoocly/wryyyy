import React from 'react';
import { commafy } from 'src/utils/method.js';
import router from 'umi/router';
import FormComp from './comp/form';
export default class index extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = {
      count:0
    };
  }
  turnToLogin = () =>{
    router.push('/but/login?id=233');
  };
  render(): React.ReactNode {
    const { count } = this.state;
    return (
      <div>
        {commafy(12564654.456456)}
        <div>
          路由传参<br/>
          <button onClick={this.turnToLogin}>点我跳login</button>
          <FormComp/>
        </div>
      </div>
    );
  }
}
