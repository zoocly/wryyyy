import React from 'react';
import {getMemTotal,getMemTotal2} from 'src/pages/services/login';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';
import _get from 'lodash/get';
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
export const chartConfig = [
  {
    key:'1004', // 人员详情
    value:{
      // coverImg:require('@/components/CardsGroup/assets/mem/chart_renyuan.jpg'),
      action:getMemTotal,
      option:(val:any)=>{
        let arr:Array<object> = [
          {value: 335, name: '直接访问'},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
          {value: 135, name: '视频广告'},
          {value: 1548, name: '搜索引擎'}
        ];
        let arrName:Array<string> = ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'];
        return {
          title : {
            text: '人员详情',
            x:'left'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            top:'middle',
            data: arrName
          },
          series : [
            {
              name: '人员信息',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:arr,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      },
    }
  },
];
