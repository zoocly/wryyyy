import React, { Fragment, useEffect } from 'react';

let timer: any = null;
let _last:any = null;
const index = () => {
  useEffect(() => {
    let node = document.getElementById('aaa');
    if (node) {
      node.addEventListener('scroll', (e: any) => {

        clearTimeout(timer);
        timer = setTimeout(()=>{
          sessionStorage.setItem('browserScrollValue', e.target.scrollTop);
        },500);

        // let _now = +new Date();
        // if(_now - _last >= 500 || !_last){
        //   sessionStorage.setItem('browserScrollValue', e.target.scrollTop);
        //   _last = _now;
        // }

      });
      const { browserScrollValue = 0 } = sessionStorage;
      node.scrollTop = browserScrollValue;
    }
  }, []);
  return (
    <Fragment>
      <div id={'aaa'} style={{ height: '100%', overflow: 'auto' }}>
        <div style={{ height: 600 }}>关于this的指向，可以分为普通函数function 和 箭头函数 ()=>{}</div>
        <div style={{ height: 600 }}>普通函数 谁调用就指向谁 还有种就是利用 call，apply，bind 改变 this，这个优先级仅次于 new</div>
        <div style={{ height: 600 }}>箭头函数 没有 this，所以一切妄图改变箭头函数 this 指向都是无效的。箭头函数的 this 只取决于定义时的环境。</div>
      </div>
    </Fragment>
  );
};
export default index;
