import React, { useEffect } from 'react';
import { Redirect } from 'umi';

export default function() {
  useEffect(()=>{
    sessionStorage.setItem('openKeys','001');
    sessionStorage.setItem('keys','001.001');

    /*
    * 一种自适应的方式
    * 动态设置根fontSize的大小，适配rem
    * clientWidth / 100 = 1X = 1rem
    * */
    // window.onresize = ()=>{
    //   console.log(document.documentElement.style.fontSize);
    //   document.documentElement.style.fontSize = document.documentElement.clientWidth / 100 + 'px';
    // }
    // document.documentElement.style.fontSize = document.documentElement.clientWidth / 100 + 'px';
  },[]);
  return (
    <div>
      <Redirect to={`/but/home`}/>
    </div>
  );
}

