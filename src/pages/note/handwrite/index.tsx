import React, { Fragment } from 'react';
import mp from './components/MyPromise.js';

const index = () => {
  let a = new mp((resolve: Function, reject: Function) => {
    setTimeout(()=>{
      resolve('success');
    },1000);
  });
  a.then((res: any) => {
    console.log(res, 'resolve');
    return new mp((resolve: Function)=>{
      setTimeout(()=>{
        resolve('zxc');
      },1000)
    })
  }).then((res:any)=>{
    console.log(res);
  });


  return (
    <Fragment>
      手写各种方法
    </Fragment>
  );
};
export default index;

