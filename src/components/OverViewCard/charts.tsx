import React, { Fragment, useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import Echarts from 'components/Echarts';
import style from './index.less';
export default function index(props:any) {
  const { chartsConfig: {option = {}, action = ''} = {}, orgCode, startDate, endDate } = props;
  const [ dataSource, setDataSource ] = useState([]);

  useEffect(()=>{
    getList();
  },[orgCode,startDate,endDate]);
  const getList = async () => {
    if(typeof action !== 'function'){
      return;
    }
    setLoading(true);
    const { code = 500 ,data = {} } = await action({orgCode,startDate,endDate});
    setLoading(false);
    code === 0 && setDataSource(data);
  };
  const [ loading, setLoading ] = useState<boolean>(false);
  return (
    <div className={style.charts}>
      <Skeleton loading={loading} active={true}>
        {
          typeof option === 'function' &&
          <Echarts option={option(dataSource)}/>
        }
      </Skeleton>
    </div>
  );
}
