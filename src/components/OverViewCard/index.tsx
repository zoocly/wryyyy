import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import style from './index.less';
import {Row,Col} from 'antd';
import CardEdit from './modal';
import Cards from './cards';
import Charts from './charts';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _upperFirst from 'lodash/upperFirst';
import { findByChartType } from './servers';
function index(props:any, ref:any) {
  const cardRef = useRef({});
  const [ cards, setCards ] = useState<Array<object>>([]);
  const [ charts, setCharts ] = useState<Array<object>>([]);
  const [ check, setCheck ] = useState<Array<any>>([]);
  const { cardConfig, chartConfig, chartType } = props;
  useImperativeHandle(ref, () => ({
    open:()=>{
      _get(cardRef,'current.open',()=>{console.log('modal没有实例化或者没有open方法')})()
    },
  }));
  useEffect(()=>{
    getList(chartType);
  },[]);
  const mergeArr = (arr1:Array<any>, arr2:Array<any>) => {
    let finalArr:Array<any> = [];
    !_isEmpty(arr1) && !_isEmpty(arr2) &&
    arr1.map((item:any)=>{
      arr2.map((it:any)=>{
        if(item['key'] === it['key']){
          finalArr.push(item);
        }
      })
    });
    return finalArr;
  };
  const getList = async (val:any) => {
    // 请求已有图表
    const {code:codeHas = 500 ,data:dataHas } = await findByChartType({chartType:_upperFirst(val)});
    if(codeHas === 0){
      let arr = _get(dataHas,`memOverview`,[]);
      let cards:Array<any> = mergeArr(cardConfig,arr);
      let charts:Array<any> = mergeArr(chartConfig,arr);
      setCharts(charts);
      setCards(cards);
      let check = [...cards,...charts].map((item:any)=>item['key']);
      setCheck(check);
    }
  };
  const submit = (val:any) => {
    getList('2333');
  };
  return (
    <Fragment>
      <Row type="flex" justify="start" gutter={16}>
        {
          useMemo(()=>{
            return cards && cards.map((item:any,index)=>{
              return (
                <Col span={6} key={index}>
                  <div className={style.cardsItem}>
                    <Cards
                      key={`${item['key']}_${new Date().valueOf()}`}
                      {...props}
                      orgCode={'001'}
                      cardData={item['value']}
                    />
                  </div>
                </Col>
              )
            })
          },[JSON.stringify(cards.map((item:any)=>item['key']))])
        }
        {
          useMemo(()=>{
            return charts && charts.map((item:any,index)=>{
              let number = charts.length;
              let quzheng = parseInt(`${number/3}`);
              let quyu = number%3;
              return (
                <Col span={quzheng * 3 > index ? 8 : quyu === 1 ? 24 : 12} key={index}>
                  <div className={style.cardsItem} style={{padding:10}}>
                    <Charts chartsConfig={item['value']} {...props} key={`${item['key']}_${new Date().valueOf()}`}/>
                  </div>
                </Col>
              )
            })
          },[JSON.stringify(charts.map((item:any)=>item['key']))])
        }
      </Row>
      {
        useMemo(()=>{
          return (
            <CardEdit ref={cardRef} {...props} check={check} submit={submit}/>
          )
        },[JSON.stringify(check)])
      }
    </Fragment>
  );
}
export default forwardRef(index);
