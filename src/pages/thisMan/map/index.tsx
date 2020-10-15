import React, { useEffect, useRef, useState } from 'react';
import style from './index.less';
import echarts from 'echarts';
import cq from '@/assets/cq.json';
import _isEmpty from 'lodash/isEmpty';
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
      title: {
        text: '重庆地图',
        left: 'center'
      },
      series: [
        {
          label: {
            normal: {
              show: false, //显示省份标签
              textStyle: {
                color: "blue"
              } //省份标签字体颜色
            },
            emphasis: { //对应的鼠标悬浮效果
              show: true,
              textStyle: {
                color: "#807080"
              }
            }
          },
          type: 'map',
          map: 'cqq',
          data:[
            {name: '大渡口区', value: 20057.34},
          ],
          backgroundColor:'rgba(255, 255, 255, 0)', // 背景透明
          itemStyle:{
            areaColor:'blue', // 所有区域颜色
          }
        }
      ]
    };
    ref.current.setOption(option);
  };
  const back = () =>{
    if(isDetail){
      initMap(cq);
      setIsDetail(false);
    }
  };
  return (
    <div>
      <div style={{background:'#ccc'}}>
        <div className={style.box}>
          {
            isDetail && <button onClick={back} className={style.back}> 返回 </button>
          }
          <div id={'map'} ref={ref2} style={{width:500,height:500}}/>
        </div>
      </div>
    </div>
  )
};
export default index;
