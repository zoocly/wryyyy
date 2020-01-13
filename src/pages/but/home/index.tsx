import React from 'react';
import Cards from 'components/OverViewCard';
import FormComp from './comp/form';
import _set from 'lodash/set';
import _get from 'lodash/get';
import {cardConfig, chartConfig} from './config';
import { Button } from 'antd';
export default class index extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = {

    };
  }
  render(): React.ReactNode {
    return (
      <div>
        <Button onClick={()=>{_get(this,'Cards.open',()=>{})()}}>编辑</Button>
        <Cards ref={e=>_set(this,'Cards',e)}
               cardConfig={cardConfig}
               chartConfig={chartConfig}
               chartType={'memOverview'}
        />
        <FormComp/>
      </div>
    );
  }
}
