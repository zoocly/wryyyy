// @ts-ignore
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useRef } from 'react';
import CardEdit from './modal';
import _get from 'lodash/get';
import { Provider } from './context';
function index(props:any, ref:any) {
  const cardRef = useRef({});
  const { cardConfig, action:{ api = '', payload = {} } = {}, } = props;
  useImperativeHandle(ref, () => ({
    open:()=>{
      _get(cardRef,'current.open',()=>{console.log('modal没有实例化或者没有open方法')})()
    },
  }));
  useEffect(()=>{
    getList();
  },[]);
  const getList = async () => {
    // 请求已有图表
    const {code = 500 ,data} = await api(payload);
    if(code === 0){

    }
  };
  return (
    <Fragment>

      <Provider value={{cardConfig}}>
        <CardEdit ref={cardRef}/>
      </Provider>
    </Fragment>
  );
}
export default forwardRef(index);
