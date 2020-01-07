import React from 'react';
import {getMemTotal,getMemTotal2} from 'src/pages/services/login';
export const cardConfig = [
  {
    key:'1001',
    value:{
      icon:'team',
      // coverImg:require('@/components/CardsGroup/assets/mem/dangyuan.jpg'),
      iconColor:'#17C1C5',
      title:'党员总数',
      suffix:'人',
      action:getMemTotal,
      end:(val:any)=>{
        const {a} = val;
        let num = a;
        return num;
      },
      content:(val:any)=>{
        let zNum = val.b;
        let yNum = val.c;
        return(
          <div>
            <div>正式党员:{zNum}人</div>
            <div>预备党员:{yNum}人</div>
          </div>
        )
      }
    },
  },
  {
    key:'1002',
    value: {
      icon: 'hourglass',
      // coverImg:require('./assets/mem/zhengshi.jpg'),
      iconColor: '#6F79C1',
      title: '正式党员',
      suffix: '人',
      action: getMemTotal2,
      end: (val: any) => {
        const { a } = val;
        let num = a;
        return num;
      },
      content: (val:any) => {
        let zNum = val.b;
        return (
          <div>
            <span>预备党员{zNum}人</span>
          </div>
        )
      },
    }
  },
];
