import React, { Fragment, useEffect, useState } from 'react';
import {Consumer} from '../config';
export default function son() {
  const [propsToState,setPropsToState] = useState();
  useEffect(()=>{
    // console.log(propsToState,'propsToState,好像没得撒子问题');
  },[propsToState]);
  return (
    <div>
      {JSON.stringify(propsToState)}
      <Consumer>
        {value => setPropsToState(value)}
      </Consumer>
    </div>
  )
}
