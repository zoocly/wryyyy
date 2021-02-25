import React, { Fragment, useEffect, useState } from 'react';
import dayjs from 'dayjs';

let timer:any;
const endTime = dayjs('2021-2-20 18:00:00');

const index = () => {
  const [time, setTime] = useState();
  useEffect(() => {
    timer = setInterval(()=>{
      setTime(new Date().valueOf())
    },1000);
  }, []);
  useEffect(()=>{
    if(time >= endTime){
      clearInterval(timer);
      timer = null;
    }
  },[time]);
  return (
    <Fragment>
      距离 {endTime.format('YYYY-MM-DD HH:mm:ss')}
      倒计时 {dayjs(time).format('YYYY-MM-DD HH:mm:ss')}
    </Fragment>
  );
};
export default index;
