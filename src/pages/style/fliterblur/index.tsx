import React, { Fragment } from 'react';
import style from './index.less';

const index = () => {
  return (
    <Fragment>
      <div className={style.poem}>
        <div className={style.content}>
          说白了是毛content:before
          <p>
            明月别枝惊鹊，<br/>
            清风半夜鸣蝉。<br/>
            稻花香里说丰年，<br/>
            听取蛙声一片。<br/>
            七八个星天外，<br/>
            两三点雨山前。<br/>
            旧时茅店社林边，<br/>
            路转溪桥忽见。<br/>
          </p>
        </div>
      </div>
    </Fragment>
  );
};
export default index;
