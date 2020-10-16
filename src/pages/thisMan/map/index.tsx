import React, { useEffect, useRef, useState } from 'react';
import style from './index.less';
import echarts from 'echarts';
import cq from '@/assets/cq.json';
import _isEmpty from 'lodash/isEmpty';
import CountUp from 'react-countup';
import './index2.css';
const index = () =>{
  const ref2 = useRef();
  const ref = useRef();
  const [ isDetail, setIsDetail ] = useState(false);

  useEffect(()=>{
    if(!_isEmpty(ref2.current)){
      let dom = document.getElementById('map');
      let chart = echarts.init(dom);
      ref.current = chart;
      initMap(cq);
      chart.on('click',(params)=>{
        let map = cq.features.find(it => it.properties.name === params.name);
        let obj = {
          features:[map],
          type:"FeatureCollection"
        };
        if(!isDetail){
          initMap(obj); // 点击进入小地图
          setIsDetail(true);
        }
      })
    }
  },[]);
  const initMap = (path) =>{
    echarts.registerMap('cqq', path);
    let option = {
      geo: {
        map: 'cqq',
        aspectScale: 0.75, //长宽比
        zoom: 1,
        roam: false,
        itemStyle: {
          normal: {
            areaColor: '#074F9B',
            shadowColor: '#074F9B',
            shadowOffsetX: 0,
            shadowOffsetY: 15
          },
        }
      },
      series: [
        {
          coordinateSystem: 'geo',
          label: {
            emphasis: {
              show:false,
            }
          },
          type: 'map',
          map: 'cqq',
          data:[
            {name: '大渡口区', value: 20057.34},
          ],
          backgroundColor:'rgba(255, 255, 255, 0)', // 背景透明
          itemStyle: {
            normal: {
              areaColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#86DBC6' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#43ADD7' // 100% 处的颜色
                }]
              },
            },
            emphasis: {
              areaColor: '#FFAE24',
            }
          },
        }
      ],
      tooltip: {
        trigger: "item",
        show: true,
        position:'top',
        backgroundColor: "#ffffff00",
        formatter: function (params) {
          let str = `
          <div class="tip bottom">
              <div class="name">${params.name}</div>
              <div class="info">总人数：<span>123444</span></div>
              <div class="info">科研项目：<span>12334</span></div>
              <div class="info" >占重庆人才：<span>44%</span></div>
          </div>
          `;
          return str;
        }
      },
    };
    ref.current.setOption(option);
  };
  const back = () =>{
    if(isDetail){
      initMap(cq);
      setIsDetail(false);
    }
  };
  const countUp = (tit,num,suffix) =>{
    return (
      <div className={style.countUpBox}>
        <div className={style.tit}>{tit}</div>
        <div className={style.count}><CountUp end={num} className={style.counts}/> {suffix} </div>
      </div>
    )
  };
  return (
    <div className={style.main}>
      <div className={style.box}>
        {
          isDetail && <button onClick={back} className={style.back}> 返回 </button>
        }
        <div className={style.countB}>
          <div>
            {countUp('全市公务员人数',180000,'人')}
          </div>
          <div>
            {countUp('市管领导干部数',34000,'人')}
          </div>
        </div>
        <div id={'map'} ref={ref2} style={{width:800,height:600}}/>
      </div>
    </div>
  )
};
export default index;
