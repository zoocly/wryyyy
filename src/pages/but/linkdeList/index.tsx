import React from 'react';
import List from './node.js';
const a = () =>{
  let list = new List();
  list.push('0');
  list.push('1');
  list.push('2');
  list.push('3');
  // list.removeAt(1);
  // list.remove('2');
  list.insert('4',3);
  console.log(list,'list');
  return (
    <div>
      基础的链表函数
    </div>
  )
};
export default a;
