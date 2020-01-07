import React, { useEffect, useState } from 'react';
import NumberCard from 'components/NumberCard';
export default function index(props:any) {
  const { icon, iconColor, end, decimals, title, prefix, suffix, content, orgCode ,startDate,endDate, action } = props.cardData;
  useEffect(()=>{
    getList();
  },[orgCode,startDate,endDate]);
  const [ dataSource, setDataSource ] = useState({});
  const getList = async () => {
    if(typeof action !== 'function'){
      return;
    }
    const { code = 500 ,data = {} } = await action({orgCode,startDate,endDate});
    code === 0 && setDataSource(data);
  };
  return (
    <NumberCard icon={icon}
                iconColor={iconColor}
                end={typeof end === 'function' ? end(dataSource) : 0}
                decimals={decimals}
                title={title}
                prefix={prefix}
                suffix={suffix}>
      { typeof content==='function' && content(dataSource) }
    </NumberCard>
  )
}
