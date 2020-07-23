import React, { useEffect, useRef, useState } from 'react';
import style from './index.less';
import { Button, Tag } from 'antd';
const { CheckableTag } = Tag;
const floor = 6;
export default function index(props:any,ref:any) {
  const { doorStatus, numsChange } = props;
  const timerRef = useRef<NodeJS.Timeout>();
  const [ toOpen, setToOpen ] = useState<any>(undefined);
  const [ selectedFloors, setSelectedFloors ] = useState([]);
  useEffect(()=>{
    doorStatus && doorStatus(toOpen);
    return ()=>{
      setToOpen(undefined);
    }
  },[toOpen]);
  const open = () =>{
    if(!toOpen){
      setToOpen(true);
      setSelectedFloors([]);
    }
    // 定时器，如果3秒没有操作开门，则自动关闭
    if(timerRef.current){
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    const id = setTimeout(function() {
      setToOpen(false);
    },3000);
    timerRef.current = id;
  };
  const close = () =>{
    if(toOpen){
      setToOpen(false);
    }
  };
  const pushBtn = (num:any,checked:boolean) =>{
    let nextSelectedTags:any = checked ? [...selectedFloors, num] : selectedFloors.filter(t => t !== num);
    setSelectedFloors(nextSelectedTags);
    numsChange && numsChange(nextSelectedTags.sort((a:number,b:number)=>a-b));
  };
  return (
    <div className={style.page}>
      <div className={style.box}>
        <div className={`${style.boxLeft} ${toOpen === undefined ? '' : toOpen ? style.turnLeft : style.closeLeft} `}/>
        <div className={`${style.boxRight} ${toOpen === undefined ? '' : toOpen ? style.turnRight : style.closeRight} `}/>
      </div>
      <div className={style.btns}>
        <div className={style.nums}>
          {
            new Array(floor).fill('').map((it,index)=>{
              return (
                <CheckableTag key={index}
                              checked={selectedFloors.includes(index+1)}
                              style={{margin:4}}
                              onChange={(checked)=>pushBtn(index+1,checked)} >{index+1}</CheckableTag>
              );
            })
          }
        </div>
        <Button onClick={open}>&lt;&gt;</Button>
        <Button onClick={close}>&gt;&lt;</Button>
      </div>
    </div>
  );
}
