import React, { Fragment } from 'react';
import Lift from './components/lift';
export default function index() {
  const numsChange = (arr:Array<number>) =>{
    console.log(arr,'arr');
  };
  const doorStatus = (status:boolean) =>{
    // console.log(status,'status');
  };
  return (
    <Fragment>
      <Lift numsChange={numsChange} doorStatus={doorStatus}/>
    </Fragment>
  );
}
