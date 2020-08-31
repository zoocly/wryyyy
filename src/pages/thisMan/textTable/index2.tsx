import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Checkbox, Tree, Input, Button, Divider } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import { treeToList, jsonToTree } from '@/utils/method.js';
import style from '@/pages/thisMan/textTable/index.less';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
const { Group } = Checkbox;
const { TreeNode } = Tree;

const checkboxConfig = [
  {title:'单位名称', key:'1'},
  {title:'考核结论', key:'2'},
  {title:'排名', key:'3'},
  {title:'总分', key:'4'},
];
const treeData = [
  {title:'民主测评', key:'5' ,parent:'-1' ,children:[{title:'对党忠诚', key:'51',parent:'5'}, {title:'抓落实促发展', key:'52',parent:'5'}, {title:'敢抓敢管勇于负责', key:'53',parent:'5'}]},
  {title:'好干部标准评价', key:'6',parent:'-1', children:[{title:'对党忠诚11', key:'61',parent:'6'},]},
];
export default function index() {
  const [ check, setCheck ] = useState<any>([]);
  const [ select, setSelect ] = useState<any>([]);
  const [ inputVal, setInputVal ] = useState();
  const [ finalConfig, setFinalConfig ] = useState<any>([]);
  const [ fakeGird, setFakeGrid ] = useState<any>([]);
  const CheckboxItem = () =>{
    const onChange = (checkedValues:any ) =>{
      // let arr = checkboxConfig.filter(it=>checkedValues.includes(it.key));
      setCheck(checkedValues);
    };
    return (
      <Group onChange={onChange} value={check}>
        {checkboxConfig.map(it=> <Checkbox key={it.key} value={it.key}>{it.title}</Checkbox>)}
      </Group>
    )
  };
  const ConfigTree = () =>{
    const renderTreeNodes = (data) =>{
      return data.map(item => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
              {renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} {...item} />;
      })
    };
    const onTreeCheck = ({ checked = [] }={}, { checked:checkFlag ,node} = {}) =>{
      const { key = '', parent = undefined } = node;
      let final = [...checked];
      if(checkFlag){
        final = [...new Set([...final, key.substring(0,1)])]
      }else {
        // 如果是取消父级则子集全部取消
        if(parent === undefined){
          final = final.filter( it => !it.startsWith(key) );
        }else {
          // // 如果取消子集且子集全部没有，取消父级
          // let arr = final.filter(it => it.startsWith(parent));
          // if(arr.length === 1){
          //   final = final.filter( it => it !== parent );
          // }
        }
      }
      setSelect(final);
    };
    return (
      <Tree checkable
            checkStrictly
            defaultExpandAll
            checkedKeys={select}
            onCheck={onTreeCheck}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    )
  };
  useEffect(()=>{
    let part1 = checkboxConfig.filter( it => check.includes(it.key) );
    let flatPart2 = treeToList(_cloneDeep(treeData),true).filter(it => select.includes(it.key));
    let part2 = jsonToTree(flatPart2,'parent','key');

    setFinalConfig([...part1,...part2]);

    let length = part2.reduce((total, it)=> total + _get(it,'children.length',1),0);
    let gird = [ new Array(part1.length+length).fill('').map(() => { return {value:' '} })];
    setFakeGrid(gird);

  },[check,select]);

  const configHead = (
    <thead>
    <tr>
      {
        finalConfig.map((it, index)=> <td key={index} rowSpan={_isEmpty(it.children) ? 2 : 1 } colSpan={ _isEmpty(it.children) ? 0 : it.children.length } >{it.title}</td> )
      }
    </tr>
    <tr>
      {
        finalConfig.map(it=>{
          if(!_isEmpty(it.children)){
            return it.children.map((it, index)=><td key={index}>{it.title}</td>)
          }
        })
      }
    </tr>
    </thead>
  );
  const colgroup = (
    <colgroup>
      {
        new Array(_get(fakeGird,'[0].length',1)).fill('').map((i, index) => <col key={index} style={{width: 100}}/>)
      }
    </colgroup>
  );
  return (
    <div>
      <div>当前序列:xxxxx</div>
      <Divider orientation="left">考核结果报表样式设置：</Divider>
        <CheckboxItem/>
        <ConfigTree/>
      <div className={style.main}>
        <Divider orientation="left">样表</Divider>
        <div style={{marginBottom:10}}>
          <Input style={{width: '80%',marginRight:'2%'}} placeholder={'填写表头名称'} onChange={({target:{value}={}}={})=>{setInputVal(value)}} value={inputVal}/> <Button type="primary">保存</Button>
        </div>
        {
          !_isEmpty(finalConfig) &&
            <Fragment>
              <table>
                {configHead}
                {colgroup}
              </table>
              <ReactDataSheet
                style={{width:'100%'}}
                data={fakeGird}
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
            </Fragment>
        }
      </div>
    </div>
  )
}
