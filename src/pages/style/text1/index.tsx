import React, { useEffect, useRef } from 'react';
import style from './index.less';
export default function index() {
  const timerRef = useRef<NodeJS.Timeout>();
  const flagRef = useRef(true);
  function selfThrottle(){
    // 节流重在加锁「flag = false」
    if (flagRef.current){
      flagRef.current = false;
      // @learnTS-ignore
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
      setTimeout(()=>{
        console.log('zxcc');
        flagRef.current = true;
      },2000);
    }
  };

  useEffect(()=>{
    window.addEventListener('scroll', function () {
      selfThrottle();
    },true);
  },[]);
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
