import React, { Fragment, useState } from 'react';
const memList = [
  {name:'ccc0',id:1},
  {name:'ccc1',id:2},
  {name:'ccc2',id:3},
  {name:'ccc3',id:4},
  {name:'ccc4',id:5},
  {name:'ccc5',id:6},
  {name:'ccc6',id:7},
];
export default function index() {

  const ondragstart = (e:any,it:any) =>{
    console.log('on drag start',it)
  };
  const ondragover = (e:any) =>{
    e.preventDefault();
    console.log('on drag over')
  };
  const ondrop = (e:any,it:any) =>{
    console.log('on drop',it)
  };
  const item = (it:any) =>{
    const { id, name } = it;
    return (
      <div onDragOver={ondragover}
           key={id}
           style={{display:'inline-block'}}
           onDrop={(e)=>ondrop(e,it)}>
        <div style={{margin:5,border:'1px solid blue',textAlign:'center',width:100,height:50}}
             onDragStart={(e)=>ondragstart(e,it)}
             // onDragEnd={ondragend}
             draggable="true">
          {name}
        </div>
      </div>
    )
  };
  return (
    <Fragment>
      {
        memList.map(it=>item(it))
      }
    </Fragment>
  )
}
