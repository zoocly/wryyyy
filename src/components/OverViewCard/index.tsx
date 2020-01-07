import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import style from './index.less';
import {Row,Col} from 'antd';
import CardEdit from './modal';
import Cards from './cards';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _upperFirst from 'lodash/upperFirst';
import { findByChartType } from './servers';
function index(props:any, ref:any) {
  const cardRef = useRef({});
  const [ cards, setCards ] = useState<Array<object>>([]);
  const [check, setCheck] = useState<Array<any>>([]);
  const { cardConfig, chartType } = props;
  useImperativeHandle(ref, () => ({
    open:()=>{
      _get(cardRef,'current.open',()=>{console.log('modal没有实例化或者没有open方法')})()
    },
  }));
  useEffect(()=>{
    getList(chartType);
  },[]);
  const getList = async (val:any) => {
    // 请求已有图表
    const {code:codeHas = 500 ,data:dataHas } = await findByChartType({chartType:_upperFirst(val)});
    if(codeHas === 0){
      let arr = _get(dataHas,`memOverview`,[]);
      let cards:Array<any> = [];
      !_isEmpty(arr) && !_isEmpty(cardConfig) &&
      cardConfig.map((item:any)=>{
        arr.map((it:any)=>{
          if(item['key'] === it['key']){
            // 把接口已有和config的数据整合为最后的cards
            cards.push(item);
          }
        })
      });
      setCards(cards);
      let check = cards.map((item:any)=>item['key']);
      setCheck(check);
    }
  };
  const submit = (val:any) => {
    getList('2333');
  };
  // console.log('renderMain');
  return (
    <Fragment>
      <Row type="flex" justify="start" gutter={16}>
        {
          useMemo(()=>{
            return (
              <Fragment>
                {
                  cards && cards.map((item:any,index)=>{
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
                }
              </Fragment>
            )
          },[JSON.stringify(check)])
        }
      </Row>
      {
        useMemo(()=>{
          // console.log(check,'check');
          return (
            <CardEdit ref={cardRef} {...props} check={check} submit={submit}/>
          )
        },[JSON.stringify(check)])
      }
    </Fragment>
  );
}
export default forwardRef(index);
