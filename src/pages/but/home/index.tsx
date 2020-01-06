import React from 'react';
import Cards from 'components/OverViewCard';
import _set from 'lodash/set';
import {cardConfig} from './config';
import { awsl } from '@/pages/services/login';
export default class index extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = {

    };
  }
  componentDidMount(): void {
    // this['Cards'].open();
  }

  render(): React.ReactNode {
    return (
      <div>
        <Cards ref={e=>_set(this,'Cards',e)}
               cardConfig={cardConfig}
               action={{api:awsl,payload:{asd:444}}}
        />
      </div>
    );
  }
}
