import React, {Fragment} from 'react';
import {Divider} from 'antd';
import style from './index.less';
export default function index() {
  return (
    <Fragment>
      <div className={style.boxaaa}>
        <p>方法1：这段文字能不能这样判断一下，当文字不足一行时，让它居中显示，当文字超过一行就让它居左，不然居中显示很奇怪，因为最后一行是吊着的</p>
      </div>
      <div style={{marginBottom:'20px'}}/>
      <div className={style.box22355}>
        <div className={style.content}>方法2(此方法甚好)：这段文字能不能这样判断一下，当文字不足一行时，让它居中显示，当文字超过一行就让它居左，不然居中显示很奇怪，因为最后一行是吊着的</div>
      </div>
      <Divider/>
      清除浮动
      <div className={style.wrap}>
        <div className={style.left}/>
        <div className={style.right}/>
      </div>
      <Divider/>
      块级元素垂直方向的距离由margin决定。属于同一个BFC的两个相邻块级元素的margin会发生重叠。(解决办法 overflow:'hidden')
      <div style={{marginBottom:'20px'}}/>
      <div style={{overflow:'hidden'}}/>
      <div style={{height:100,width:100,background:'red',marginTop:20}}/>
    </Fragment>
  )
}
