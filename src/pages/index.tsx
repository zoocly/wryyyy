import React, { useEffect } from 'react';
import { Redirect } from 'umi';

export default function() {
  useEffect(()=>{
    sessionStorage.setItem('openKeys','001');
    sessionStorage.setItem('keys','001.001');

    /*
    * 一种自适应的方式
    * 动态设置根fontSize的大小，适配rem
    * fontSize = clientWidth / 100 = 1X = 1rem
    * 某一元素在当前页面中要写的rem = 元素的在效果图的px / fontSize
    * 这个元素在当前页面中的真实px = fontSize * xx rem
    *
    * UE图宽度	UE图中元素宽度
    * 640px	  100px
    * 480px	  75px
    *
    * 在640宽度中 则 fontSize = 640 / 100  = 6.4px
    * 元素宽度 = 100/6.4 = 15.625rem
    *
    * 在640宽度中 则 fontSize = 480 / 100  = 4.8px
    * 元素宽度 = 75/4.8 = 15.625rem
    *
    * 所以元素写 15.625rem 就适配以上屏幕
    *
    *  rem x fontSize = 当前元素宽度width
    *  若知道 rem ， 则 width / rem , 得 fontSize
    *  根据 document.documentElement.clientWidth / x  =  fontSize;
    *  则能算出不同屏幕中，适配参数 x
    *
    * */
    // window.onresize = ()=>{
    //   console.log(document.documentElement.style.fontSize);
    //   document.documentElement.style.fontSize = document.documentElement.clientWidth / 100 + 'px';
    // }
    // document.documentElement.style.fontSize = document.documentElement.clientWidth / 100 + 'px';
  },[]);
  return (
    <div>
      <Redirect to={`/note/deep`}/>
    </div>
  );
}

