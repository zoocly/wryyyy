import React, { useEffect, useState } from 'react';
import { useRequest } from '@umijs/hooks';
import {awsl} from '@/pages/services/login';
import { Button, Input } from 'antd';
import _isEmpty from 'lodash/isEmpty';
export default function index(props:any) {
  /*
  * useRequest 常见分2种情况
  * 第一种为自动发送请求
  * */
  // const { data, error, loading } = useRequest(awsl);
  // console.log(data, error, loading,'data, error, loading')

  /*
  * 第二种为事件触发
  * 结构参数第二个就是要运行的方法（事件触发）
  * */
  const [inputVal, setInputVal] = useState<any>(undefined);
  const { loading:loading2, run } = useRequest(awsl,{
    manual:true,
    onSuccess:(result, params)=>{
      console.log(result, params,'result, params')
    },
  });


  return (
    <div>
      <Input
        onChange={e => setInputVal(e.target.value)}
        value={inputVal}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <Button onClick={() => run({inputVal})} loading={loading2}>
        Edit
      </Button>
    </div>
  )
}
