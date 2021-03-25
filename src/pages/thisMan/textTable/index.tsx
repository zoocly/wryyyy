import React, { useEffect, useRef, useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import style from './index.less';
import BorderBox1 from '@jiaminghi/data-view-react/es/BorderBox1'
import ScrollBoard from '@jiaminghi/data-view-react/es/ScrollBoard'
import CapsuleChart from '@jiaminghi/data-view-react/es/CapsuleChart'

export default function index() {
  const ref = useRef();
  const init = [
    [{ value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 888 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 888 }],
    [{ value: 2 }, { value: 3 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 888 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 888 }],
    [{ value: 3 }, { value: 3 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 888 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }, { value: 1 }, { value: 888 }],
  ];
  const [grid, setGrid] = useState(init);
  const colgroup = (
    <colgroup>
      <col style={{ width: 55 }}/>
      <col style={{ width: 142 }}/>
      <col style={{ width: 142 }}/>
      <col style={{ width: 142 }}/>
      {
        new Array(11).fill('').map((i, index) => <col key={index} style={{ width: 80 }}/>)
      }
      <col style={{ width: 142 }}/>
    </colgroup>
  );
  const head = (
    <thead>
    <tr>
      <td rowSpan={2}>序号</td>
      <td colSpan={8}>建议人选</td>
      <td colSpan={3}>推荐考察情况</td>
      <td colSpan={2}>考察结果</td>
      <td rowSpan={2}>近5年年度考核情况</td>
      <td rowSpan={2}>备注</td>
    </tr>
    <tr>
      <td>姓名</td>
      <td>现任职务</td>
      <td>拟任职务</td>
      <td>拟免职务</td>
      <td>出生年月</td>
      <td>现职务任职时间</td>
      <td>现职级任职时间</td>
      <td>最高学历</td>
      <td>会议推荐情况</td>
      <td>谈话推荐情况</td>
      <td>民主测评优秀率</td>
      <td>得票数</td>
      <td>排名</td>
    </tr>
    </thead>
  );
  const config = {
    data: [
      ['行1列1', '行1列2', '行1列3'],
      ['行2列1', '行2列2', '行2列3'],
      ['行3列1', '行3列2', '行3列3'],
      ['行4列1', '行4列2', '行4列3'],
      ['行5列1', '行5列2', '行5列3'],
      ['行6列1', '行6列2', '行6列3'],
      ['行7列1', '行7列2', '行7列3'],
      ['行8列1', '行8列2', '行8列3'],
      ['行9列1', '行9列2', '行9列3'],
      ['行10列1', '行10列2', '行10列3']
    ]
  }
  const config2 = {
    data: [
      {
        name: '南阳',
        value: 167
      },
      {
        name: '周口',
        value: 123
      },
      {
        name: '漯河',
        value: 98
      },
      {
        name: '郑州',
        value: 75
      },
      {
        name: '西峡',
        value: 66
      },
    ],
    colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
    unit: '单位',
    showValue: true
  }
  useEffect(()=>{
    // window.addEventListener('click',(e)=>{
    //   console.log(e,'e');
    // })
    setTimeout(()=>{
      /*
       * 可以通过class来获取当前点击数据的值，在从接口数据中获取点击信息
       * */
      let a = document.getElementsByClassName('asd')[0].getElementsByClassName('capsule-item');
      console.log(a);
      a[0].onclick = function(e){
        const { target:{innerText = ''} = {} } = e || {};
        console.log(innerText,'innerText');
      }
      a[0].onmouseover = function(){
        a[0].style.cursor = "pointer";
      }
    },100)

  },[]);

  return (
    <div className={style.box}>
      <BorderBox1>
        <div className={style.main}>
          <div className={style.tit}>提请审议的干部任免名单</div>
          <table>
            {head}
            {colgroup}
          </table>
          <ReactDataSheet
            style={{ width: '100%' }}
            //@ts-ignore
            data={grid}
            valueRenderer={(cell: any) => cell['value']}
            sheetRenderer={(props: any) => {
              return (
                <table>
                  {colgroup}
                  <tbody>{props.children}</tbody>
                </table>
              );
            }}
            cellRenderer={(props: any) => {
              const { cell = {} } = props || {};
              return (
                <td style={{ height: 28 }}>{cell['value']}</td>
              );
            }}
          />
        </div>
      </BorderBox1>
      <ScrollBoard config={config} style={{width: '500px', height: '220px'}} ref={ref}/>
      <CapsuleChart config={config2} style={{width:'300px',height:'200px'}} id={'type1'} className={'asd'}/>
      <CapsuleChart config={config2} style={{width:'300px',height:'200px'}} />
    </div>
  );
}
