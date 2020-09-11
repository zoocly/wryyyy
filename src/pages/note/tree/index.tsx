import React, { Fragment, useEffect, useRef, useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _isNumber from 'lodash/isNumber';
import _cloneDeep from 'lodash/cloneDeep';
import _last from 'lodash/last';
import { treeToList } from '@/utils/method.js';
import { Head, Colgroup } from '@/components/DynamicTableHead';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { Tree } from 'antd';
const { TreeNode } = Tree;
const index = (props:any) =>{
  const res = {
    "code": 0,
    "data": [{
      "children": [{
        "k0100": "011A60CE22B44A3FA4CE885703C0898A",
        "k0500": "061D3B2DEBF44F8096CE12A47D772934",
        "k0501": "0101",
        "k0505": "指标名称2",
        "k0506": "考核内容",
        "parent":'01',
      }],
      "k0100": "011A60CE22B44A3FA4CE885703C0898A",
      "k0500": "24203488BF9846C5B968F9D489D54FB5",
      "k0501": "01",
      "k0505": "指标名称1",
      "k0506": "考核内容",
      "parent":'-1'
    }, {
      "children": [{
        "k0100": "011A60CE22B44A3FA4CE885703C0898A",
        "k0500": "DFD59522FAEC4ECCA0C6E987AC74D224",
        "k0501": "0401",
        "parent":'04',
        "k0505": "指标四",
        "k0506": "考核内容四"
      }, {
        "k0100": "011A60CE22B44A3FA4CE885703C0898A",
        "k0500": "44BFD72785A54E84921F32D8C6DAD8BA",
        "k0501": "0402",
        "parent":'04',
        "k0505": "指标四",
        "k0506": "考核内容四"
      }],
      "k0100": "011A60CE22B44A3FA4CE885703C0898A",
      "k0500": "BB5D8E19B67B48139E7811F32837FAB7",
      "k0501": "04",
      "parent":'-1',
      "k0505": "指标四",
      "k0506": "考核内容四"
    }, {
      "children": [{
        "children": [{
          "k0501": "020202",
          "k0505": "指标名称5",
          "parent":'0202',
          "children":[{
            "k0501": "02020202",
            "k0505": "指标名称52222",
          }]
        },],
        "k0100": "011A60CE22B44A3FA4CE885703C0898A",
        "k0500": "15B6BD4597AE7147715E17208F975E03",
        "k0501": "0202",
        "parent":'02',
        "k0505": "指标名称7",
        "k0506": "考核内容"
      }],
      "k0100": "011A60CE22B44A3FA4CE885703C0898A",
      "k0500": "1508F975E7715E17203B6BD4597AE714",
      "k0501": "02",
      "parent":'-1',
      "k0505": "指标名称5",
      "k0506": "考核内容"
    }],
    "message": "操作成功",
    "version": "dev-pg-3.1.02"
  };
  const { data = [] } = res;

  return (
    <div>
      <Fragment>
        <table>
          <Head tree={data} nodeName={'k0505'} stepFunc={ (it:any)=>it.k0501.length/2 - 1 }/>
          <Colgroup tree={data}/>
        </table>
        <ReactDataSheet
          style={{width:'100%'}}
          data={[]}
          valueRenderer={(cell:any) => cell['value']}
          sheetRenderer={(props:any) => {
            return (
              <table>
                <Colgroup tree={data}/>
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
      </Fragment>
    </div>
  )
};
export default index;
