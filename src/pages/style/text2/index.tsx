import React, {Fragment} from 'react';
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
    </Fragment>
  )
}
