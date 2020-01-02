import React, { useEffect } from 'react';
import Redirect from 'umi/redirect';

export default function() {
  useEffect(()=>{
    sessionStorage.setItem('openKeys','001');
    sessionStorage.setItem('keys','001.001');
  },[]);
  return <Redirect to={`/but/home`}/>;
}

