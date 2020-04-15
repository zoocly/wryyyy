import React, { Fragment, useState } from 'react';
import { Button } from 'antd';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import style from './index.less';

export default function index() {
  const init =  [
    [{value:  1}, {value:  3},{value:  1}, {value:  3},{value:  1}, {value:  3},{value:  1}, {value:  3},{value:  1}, {value:  888},{value:  1}, {value:  3},{value:  1}, {value:  3},{value:  1}, {value:  888}],
    [{value:  2}, {value:  3},{value:  1}, {value:  3},{value:  1}, {value:  3},{value:  1}, {value:  3},{value:  1}, {value:  888},{value:  1}, {value:  3},{value:  1}, {value:  3},{value:  1}, {value:  888}],
    [{value:  3}, {value:  3},{value:  1}, {value:  3},{value:  1}, {value:  3},{value:  1}, {value:  3},{value:  1}, {value:  888},{value:  1}, {value:  3},{value:  1}, {value:  3},{value:  1}, {value:  888}],
  ];
  const [ grid, setGrid ] = useState(init);
  const colgroup = (
    <colgroup>
      <col style={{width: 55}}/>
      <col style={{width: 142}}/>
      <col style={{width: 142}}/>
      <col style={{width: 142}}/>
      {
        new Array(11).fill('').map((i, index) => <col key={index} style={{width: 80}}/>)
      }
      <col style={{width: 142}}/>
    </colgroup>
  );
  const head = (
    <thead>
    <tr>
      <td rowSpan={2} >序号</td>
      <td colSpan={8} >建议人选</td>
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
  return (
    <div className={style.box}>
      <div className={style.main}>
        <div className={style.tit}>提请审议的干部任免名单</div>
        <table>
          {head}
          {colgroup}
        </table>
        <ReactDataSheet
          style={{width:'100%'}}
          //@ts-ignore
          data={grid}
          valueRenderer={(cell:any) => cell['value']}
          sheetRenderer={(props:any) => {
            return (
              <table>
                {colgroup}
                <tbody>{props.children}</tbody>
              </table>
            );
          }}
          cellRenderer={(props:any)=>{
            const {cell = {}} = props || {};
            return (
              <td style={{height:28}}>{cell['value']}</td>
            )
          }}
        />
      </div>
    </div>
  );
}
