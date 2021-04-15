import React from 'react';
import style from './index.less';

const index = () => {
  return (
    <div className={style.main}>
      <div className={style.bg}>
        <div className={style.top} />
        <div className={style.leftline} />
        <div className={style.rightline}/>
        <div className={style.leftline1}/>
        <div className={style.rightline1}/>
      </div>
    </div>
  );
};
export default index;
