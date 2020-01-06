import React from 'react';
export const cardConfig = [
  {
    key:'1001',
    value:{
      icon:'team',
      // coverImg:require('@/components/CardsGroup/assets/mem/dangyuan.jpg'),
      iconColor:'#17C1C5',
      title:'党员总数',
      suffix:'人',
      action:'/api/chart/mem/getMemTotal',
      end:(val:any)=>{
        let num = 0;
        return num;
      },
      content:(val:any)=>{
        let zNum = 0;
        let yNum = 0;
        return(
          <div>
            <div>正式党员:{zNum}人</div>
            <div>预备党员:{yNum}人</div>
          </div>
        )
      }
    },
  },
];
