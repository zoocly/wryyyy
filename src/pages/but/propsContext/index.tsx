import React, { Fragment, useState } from 'react';
import {Provider} from './config';
import Son from './comp/son';
import {awsl} from 'src/pages/services/login'
export default function index() {
  const [obj,setObj] = useState({a:1});
  const changeMsg = async () =>{
    const res = await awsl({cly:2333});
    setObj(res.data);
  };

  return (
    <Fragment>
      context传值<br/>
      <button onClick={changeMsg}>改变值</button>
      <Provider value={obj}>
        不晓得有撒子问题
        <Son/>
      </Provider>
    </Fragment>
  )
}
