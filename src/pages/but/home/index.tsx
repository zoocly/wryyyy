import React from 'react';
import { commafy } from 'src/utils/method.js';
export default class index extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = {
      count:0
    };
  }

  render(): React.ReactNode {
    const { count } = this.state;
    return (
      <div>
        {commafy(12564654.456456)}
      </div>
    );
  }
}
