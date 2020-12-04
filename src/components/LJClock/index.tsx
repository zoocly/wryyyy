import React, { Fragment, useEffect } from 'react';
import './index.less';
import $ from 'jquery';

const index = () => {
  useEffect(() => {
    setInterval(()=>{
      let myDate = new Date();
      $('#ho').css({
        transform: `rotate(${myDate.getHours() * 30}deg)`,
      });
      $('#mi').css({
        transform: `rotate(${myDate.getMinutes() * 6}deg)`,
      });
      $('#se').css({
        transform: `rotate(${myDate.getSeconds() * 6}deg)`,
      });
    },1000);
  }, []);
  return (
    <Fragment>
      <div className='clock'>
        <div className='hour'>
          <div className='ho' id={'ho'} />
        </div>
        <div className='min'>
          <div className='mi' id={'mi'} />
        </div>
        <div className='sec'>
          <div className='se' id={'se'} />
        </div>
      </div>
    </Fragment>
  );
};
export default index;
