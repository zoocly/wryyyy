import React from 'react';
import { history as _history } from '@@/core/history';

export default class index extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps:any, prevState:any) {
    console.log(nextProps, prevState);
    return null;
  }

  render() {
    // @ts-ignore
    const {val} = this.props || {};
    return (
      <div>
        {val}
        <button onClick={() => {
          sessionStorage.setItem('haha', '结论是在useEffect是无法监听sessionStorage和localStorage的变化的' + new Date().valueOf());
          _history.push('?');
        }}>点我发session
        </button>
      </div>
    );
  }
};
