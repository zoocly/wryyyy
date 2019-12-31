import React from 'react';
export default class index extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = {
      count:0
    };
  }
  sure = () => {
    const {count} = this.state;
    this.setState({
      count:count + 1
    });
    this.setState((prevState:any, props:any) => {
      console.log(prevState,props,'ssss')
    })
  };
  render(): React.ReactNode {
    const { count } = this.state;
    return (
      <div>
        <h2>setState很奇怪的用法{count}</h2>
        <button onClick={this.sure}>确定</button>
      </div>
    );
  }
}
