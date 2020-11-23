import React, { useEffect, useRef, useState } from 'react';
import { Divider } from 'antd';
import style from './index.less';

import Chouti from '../chouti';

export default function index() {

  return (
    <div>
      <Chouti/>
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
