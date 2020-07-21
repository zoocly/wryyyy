import React, { useState } from 'react';
import style from './index.less';
import { Button, Tag } from 'antd';
const { CheckableTag } = Tag;
const floor = 6;
export default function index() {
  const [ toOpen, setToOpen ] = useState(false);
  const [ toClose, setToClose ] = useState(false);
  const [ selectedFloors, setSelectedFloors ] = useState([]);
  const open = () =>{
    if(!toOpen){
      setToOpen(true);
      setToClose(false);
    }
  };
  const close = () =>{
    if(toOpen){
      setToClose(true);
      setToOpen(false);
    }
  };
  const pushBtn = (num:any,checked:boolean) =>{
    let nextSelectedTags = checked ? [...selectedFloors, num] : selectedFloors.filter(t => t !== num);
    setSelectedFloors(nextSelectedTags);
  };
  return (
    <div className={style.page}>
      <div className={style.box}>
        <div className={`${style.boxLeft} ${toOpen ? style.turnLeft : ''} ${toClose ? style.closeLeft : ''}`}/>
        <div className={`${style.boxRight} ${toOpen ? style.turnRight : ''} ${toClose ? style.closeRight : ''}`}/>
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
              )
            })
          }
        </div>
        <Button onClick={open}>&lt;&gt;</Button>
        <Button onClick={close}>&gt;&lt;</Button>
      </div>
    </div>
  );
}
