import React, { Fragment } from 'react';
import style from './index.less';
export default function index(props:any) {
  const { nowStep, toUp, ToDown } = props;
  const up = () =>{
    toUp && toUp();
  };
  const down = () =>{
    ToDown && ToDown();
  };
  return (
    <div className={style.box}>
      <div className={style.show}>{nowStep}</div>
      <div>
        <div className={style.up} onClick={up}/>
        <div className={style.down} onClick={down}/>
      </div>
    </div>
  )
}
