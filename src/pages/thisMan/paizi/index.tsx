import React, { Fragment, useEffect,useState,useMemo } from 'react';
import style from './index.less';

const index = ()=>{
  return (
    <Fragment>
      <div className={style.box}>
        <div className={style.img1}/>
        <div className={style.img2}/>
        <div className={style.img3}/>
      </div>
      <div className={style.water}>
        <div className={style.wave1}/>
        <div className={style.wave2}/>
        <div className={style.wave3}/>
      </div>
    </Fragment>

  )
};
export default index;

/*
* class组件和hook组件都可以互相嵌套HOC
* 但是嵌套之间的组件在生命周期会有些不同，比如：
* 外层是class 里层是hook，则会先执行componentDidmount 然后执行useEffect
* 外层是hook 里层是hook，则会先执行里层
*
*
* 无状态组件
* 可以理解为 react官方 想要的最纯粹的组件模式
* 其特点是不需要是不需要管理状态state，数据直接通过props传入
*
*
* 有状态组件
* 通常这种组件会有生命周期，有state状态管理，业务组件经常用到
* */
