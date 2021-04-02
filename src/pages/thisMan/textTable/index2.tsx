import React, { Fragment, useEffect, useState } from 'react';
import { Button, Checkbox, Divider, Input, Tree } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import { jsonToTree, treeToList } from '@/utils/method.js';
import style from '@/pages/thisMan/textTable/index.less';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { Colgroup, fakeLine, Head } from '@/components/DynamicTableHead';

const { Group } = Checkbox;
const { TreeNode } = Tree;

const checkboxConfig = [
  { title: '单位名称', key: '1' },
  { title: '考核结论', key: '2' },
  { title: '排名', key: '3' },
  { title: '总分', key: '4' },
];
function getKey(data){
  let res:any=[];
  for (const item of data) {
    const obj=item['dataRef'];
    if(obj && obj['k0500']){
      res.push(obj['k0500']);
    }
    if(item['children']){
      res=res.concat(getKey(item['children']))
    }
  }
  return res;
}
const treeData = [
  {
    title: '民主测评',
    key: '5',
    parent: '-1',
    children: [
      {
        title: '对党忠诚',
        key: '51',
        parent: '5',
        children: [
          {
            title: '对党忠诚',
            key: '511',
            parent: '51',
            children: [
              { title: '对党忠诚', key: '5111', parent: '511' },
              {
                title: '对党忠诚22222',
                key: '5112',
                parent: '511',
                children: [
                  { title: 'ff阿萨德', key: '51121', parent: '5112' },
                  { title: '他他他他他他', key: '51122', parent: '5112' },
                ],
              },
            ],
          },
          { title: '抓落实促发展', key: '521', parent: '51' },
          { title: '敢抓敢管勇于负责', key: '531', parent: '51' },
        ],
      },
      { title: '抓落实促发展', key: '52', parent: '5' },
      { title: '敢抓敢管勇于负责', key: '53', parent: '5' }],
  },
  {
    title: '好干部标准评价',
    key: '6',
    parent: '-1',
    children: [
      { title: '对党忠诚11', key: '61', parent: '6' },
      {
        title: '顺丰到付',
        key: '62',
        parent: '6',
        children: [
          { title: 'ff阿萨德', key: '621', parent: '62' },
          { title: '纷纷', key: '622', parent: '62' },
        ],
      },
      { title: '嘎嘎嘎嘎', key: '63', parent: '6' },
    ],
  },
];
export default function index() {
  const [check, setCheck] = useState<any>([]);
  const [select, setSelect] = useState<any>([]);
  const [inputVal, setInputVal] = useState();
  const [finalConfig, setFinalConfig] = useState<any>([]);
  const [fakeGird, setFakeGrid] = useState<any>([]);
  const CheckboxItem = () => {
    const onChange = (checkedValues: any) => {
      // let arr = checkboxConfig.filter(it=>checkedValues.includes(it.key));
      setCheck(checkedValues);
    };
    return (
      <Group onChange={onChange} value={check}>
        {checkboxConfig.map(it => <Checkbox key={it.key} value={it.key}>{it.title}</Checkbox>)}
      </Group>
    );
  };
  useEffect(() => {
    let part1 = checkboxConfig.filter(it => check.includes(it.key));
    let flatPart2 = treeToList(_cloneDeep(treeData), true).filter(it => select.includes(it.key));
    let part2 = jsonToTree(flatPart2, 'parent', 'key');

    setFinalConfig([...part1, ...part2]);

    let gird = [new Array(fakeLine([...part1, ...part2])).fill('').map(() => {
      return { value: ' ' };
    })];
    setFakeGrid(gird);

  }, [check, select]);
  return (
    <div>
      <div>当前序列:xxxxx</div>
      <Divider orientation="left">考核结果报表样式设置：</Divider>
      <CheckboxItem/>
      <TressComp onSelect={(val: any) => {
        setSelect(val);
      }}/>
      <div className={style.main}>
        <Divider orientation="left">样表</Divider>
        <div style={{ marginBottom: 10 }}>
          <Input style={{ width: '80%', marginRight: '2%' }} placeholder={'填写表头名称'}
                 onChange={({ target: { value } = {} }) => {
                   setInputVal(value);
                 }} value={inputVal}/> <Button type="primary">保存</Button>
        </div>
        {
          !_isEmpty(finalConfig) &&
          <Fragment>
            <table>
              <Head tree={finalConfig} nodeName={'title'}/>
              <Colgroup tree={finalConfig}/>
            </table>
            {/*<ReactDataSheet*/}
            {/*  style={{ width: '100%' }}*/}
            {/*  data={fakeGird}*/}
            {/*  valueRenderer={(cell: any) => cell['value']}*/}
            {/*  sheetRenderer={(props: any) => {*/}
            {/*    return (*/}
            {/*      <table>*/}
            {/*        <Colgroup tree={finalConfig}/>*/}
            {/*        <tbody>{props.children}</tbody>*/}
            {/*      </table>*/}
            {/*    );*/}
            {/*  }}*/}
            {/*  cellRenderer={(props: any) => {*/}
            {/*    const { cell = {} } = props || {};*/}
            {/*    return (*/}
            {/*      <td style={{ height: 28 }}>{cell['value']}</td>*/}
            {/*    );*/}
            {/*  }}*/}
            {/*/>*/}
          </Fragment>
        }
      </div>
    </div>
  );
}
const TressComp = (props: any) => {
  const { onSelect } = props;
  const [select, setSelect] = useState<any>([]);
  const renderTreeNodes = (data: any) => {
    return data.map((item: any) => {
      if (item.children) {
        return (
          // @ts-ignore
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} title={item.title} dataRef={item}/>;
    });
  };
  const getAllParent = (item:any, tree:any) =>{
    let arr:any = [item.key];
    let flatTree = treeToList(_cloneDeep(tree),true);
    const getParents = (its:any)=>{
      let find = flatTree.find((it:any)=>it.key === its.parent);
      if(find){
        arr.push(find.key);
        if(find.parent !== '-1'){
          getParents(find);
        }
      }
    };
    getParents(item);
    return arr;
  };
  const onTreeCheck = (checkedKeys:any, item:any) => {
    const { checked = [] } = checkedKeys;
    const { checked: checkFlag = false, node = {} } = item;
    const { key = '', dataRef, children = [] } = node;
    let final = [...checked];
    if (checkFlag) {
      // 获取选中点以上的所有父节点
      final = [...final, ...getAllParent(dataRef,treeData)];
    } else {
      console.log(dataRef);
      // 取消选中点以下的所有子节点
      if(!_isEmpty(final) && children.length>0){
        let allKey = treeToList(children,true).map((it:any)=>it.key);
        final= final.filter(it => !allKey.includes(it) );
      }
    }
    final = [...new Set(final)];
    onSelect && onSelect(final);
    setSelect(final);
  };
  return (
    <div>
      <Tree checkable
            checkStrictly
            defaultExpandAll
            onCheck={onTreeCheck}
            checkedKeys={select}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </div>
  );
};
