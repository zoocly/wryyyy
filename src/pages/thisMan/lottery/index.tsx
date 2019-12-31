import React from 'react';
import style from  './index.less';
export default function index() {
  return (
    <div>
      <h1>毛锅来抽奖</h1>
      <div>
        <div className={style.box}>
          <div className={style.item}>请吃饭</div>
          <div className={style.item}>请抽烟</div>
          <div className={style.item}>请吃饭</div>
          <div className={style.item}>请抽烟</div>
          <div className={`${style.item} ${style.start}`}>开始</div>
          <div className={style.item}>请吃饭</div>
          <div className={style.item}>请抽烟</div>
          <div className={style.item}>请吃饭</div>
          <div className={style.item}>请抽烟</div>
          <div className={style.spin}/>
        </div>
      </div>
    </div>
  )
}
