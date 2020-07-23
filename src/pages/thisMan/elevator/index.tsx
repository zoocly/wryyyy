import React, { Fragment } from 'react';
import Lift from './components/lift';
import House from './components/house';
const floor = 6;
export default function index() {
  const numsChange = (arr:Array<number>) =>{
    console.log(arr,'arr');
  };
  const doorStatus = (status:boolean) =>{
    // console.log(status,'status');
  };
  return (
    <Fragment>
      <Lift numsChange={numsChange} doorStatus={doorStatus} floor={floor}/>
      <div style={{height:floor*100,width:'100%'}}>
        <div style={{margin:'0 auto',width:300,height:'100%'}}>
          <House floor={floor}/>
        </div>
      </div>
    </Fragment>
  );
}
