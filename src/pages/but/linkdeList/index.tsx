import React from 'react';
import List from './node.js';
import List2 from './node2.js';
const a = () =>{
  // 单向
  let list = new List();
  list.push('0');
  // list.push('1');
  // list.push('2');
  // list.push('3');
  // list.removeAt(1);
  // list.remove('2');
  // list.insert('4',1);
  // console.log(list,'list');

  // 双向
  let list2 = new List2();
  list2.push('0');
  list2.push('1');
  list2.insert('3',1);
  list2.remove('3');
  console.log(list2,'list2');
  return (
    <div>
      基础的链表函数
    </div>
  )
};
export default a;
