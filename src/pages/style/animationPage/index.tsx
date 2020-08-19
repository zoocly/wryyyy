import React, { useEffect, useRef, useState } from 'react';
import { Divider } from 'antd';
import style from './index.less';

export default function index() {

  return (
    <div>
      <div className={style.box1}>
        <span>距离结束还有10天</span>
      </div>
      <Divider/>
      <div className={style.box2}>
        <span>距离结束还有10天</span>
      </div>
      <Divider/>
      
    </div>
  )
}
