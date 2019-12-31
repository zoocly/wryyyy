import React from 'react';
import style from './index.less';
export default function index() {
  return (
    <div>
      <div style={{height:'60vh'}}>
        123
      </div>
      毛玻璃效果 (图片大小有问题,不能有滚动)
      <div className={style.out}>
        <div className={style.inner}>
         12333
        </div>
      </div>
      <div style={{height:'60vh'}}>
        123
      </div>
    </div>
  )
}
