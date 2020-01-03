import React from 'react';
import {createPostXHR,createXHR} from './config';
import {login} from 'src/pages/services/login';
import _get from 'lodash/get';
export default class index extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {

    };
  }
  onClickGet = () => {
    createXHR();
  };
  onClickPost = () => {
    createPostXHR();
  };
  onClickOther = async () => {
    const res = await login({});
  };
  render(): React.ReactNode {
    const {id = ''} = _get(window,'g_history.location.query',{});
    return (
      <div>
        模拟发请求{id}
        <br/>
        <button onClick={this.onClickGet}>点我get</button>
        <br/>
        <br/>
        <button onClick={this.onClickPost} >点我post</button>
        <br/>
        <br/>
        <button onClick={this.onClickOther} >走其他</button>
      </div>
    );
  }
}
