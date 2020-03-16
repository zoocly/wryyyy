import React, { Fragment, useEffect, useState } from 'react';
import {Divider} from 'antd';
import {Provider} from './config';
import Son from './comp/son';
import {awsl} from 'src/pages/services/login'
export default function index() {
  const [obj,setObj] = useState({a:1});
  const changeMsg = async () =>{
    const res = await awsl({cly:2333});
    setObj(res.data);
  };

  const [ width ,setWidth ] = useState(window.innerWidth);

  useEffect(()=>{
    const getWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", getWidth);
    return ()=> window.removeEventListener("resize", getWidth);
  },[]);

  return (
    <Fragment>
      context传值<br/>
      <button onClick={changeMsg}>改变值</button>
      <Provider value={obj}>
        不晓得有撒子问题
        <Son/>
      </Provider>
      <Divider/>
      使用Hooks+resize可以实时获取浏览器宽度<br/>
      window.innerWidth的值:{width}
    </Fragment>
  )
}
