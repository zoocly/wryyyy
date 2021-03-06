import React, { Fragment } from 'react';
import { Divider } from 'antd';
export default function index() {

  const doSth = () =>{
    const obj = { name:'aaaa', age:'bbb' };
    const arr = [ '111', '222' ];
    const map = new Map([['a',1],['b',2]]);
    const set = new Set([['a',1],['b',2]]);
    const str = 'string';
    let printObj = '', printMap = '',printSet = '', printStr = '', printArr = '';
    for(let [k, v] of Object.entries(obj)){
      printObj += `key:${k},value:${v}; `
    }
    for(let [ index, it ] of arr.entries()){
      printArr += `index:${index},it:${it}; `
    }
    for(let [ index, it ] of map){
      printMap += `index:${index},it:${it}; `
    }
    for(let [ index, it ] of set){
      printSet += `index:${index},it:${it}; `
    }
    for(let i of str){
      printStr += i + ',';
    }
    return (
      <div>
        <p>{printObj}</p>
        <p>{printArr}</p>
        <p>{printMap}</p>
        <p>{printSet}</p>
        <p>{printStr}</p>
      </div>
    )
  };

  return (
    <Fragment>
      <ul>
        <li><code>for语句</code>是最原始的循环语句。定义一个变量<code>i</code>(数字类型，表示数组的下标),按照一定的条件，对<code>i</code>进行循环累加。条件通常为循环对象的长度，当超过长度就停止循环。因为对象无法判断长度，所以搭配<code>Object.keys()</code>使用。</li>
        <li><code>forEach</code> ES5 提出。自称是<code>for语句</code>的加强版，可以发现它比<code>for语句</code>在写法上简单了很多。但是本质上也是数组的循环。<code>forEach</code>每个数组元素执行一次 callback 函数。也就是调用它的数组，因此，不会改变原数组。返回值是<code>undefine</code>。</li>
        <li><code>map</code>  ES5 提出。给原数组中的每个元素都按顺序调用一次  callback 函数。生成一个新数组，不修改调用它的原数组本身。返回值是新的数组。</li>
        <li><code>for...in</code>  ES5 提出。遍历对象上的可枚举属性，包括原型对象上的属性，且按任意顺序进行遍历，也就是顺序不固定。遍历数组时把数组的下标当作键值，此时的i是个字符串型的。它是为遍历对象属性而构建的，不建议与数组一起使用。</li>
        <li><code>for...of</code> ES6 提出。只遍历可迭代对象的数据。</li>
      </ul>
      <ul>
        <li>在 forEach 和 map 中,使用return和break是存在问题的.传入的function是这里的回调函数。在回调函数里面使用break肯定是非法的，因为break只能用于跳出循环，回调函数不是循环体.在回调函数中使用return，只是将结果返回到上级函数，也就是这个for循环中，并没有结束for循环，所以return也是无效的。</li>
      </ul>
      <p>对于纯对象的遍历，选择<code>for..in</code>枚举更方便；<br/>
      对于数组遍历，如果不需要知道索引<code>for..of</code>迭代更合适，因为还可以中断；<br/>
        如果需要知道索引，则<code>forEach()</code>更合适；<br/>
        对于其他字符串，类数组，类型数组的迭代，<code>for..of</code>更占上风更胜一筹。但是注意低版本浏览器的是配性。</p>
      <Divider/>
      <h1><code>for...of</code> 对 obj map set str arr 的遍历</h1>
      {doSth()}
      <img src={require('@/assets/NotRecommended.png')}/>
      <Divider orientation={'left'}>关于数据多了，使用filter筛选的小优化</Divider>
      <div>
        <img src={require('@/assets/filter1.png')} />
        <img src={require('@/assets/filter2.png')}/>
      </div>
      这样写的复杂程度是O(n^2),平时自己写筛选会这样。但是如果另外一种写法复杂度就从O(n^2)变成了O(2n)<br/>
      利用hash表思想解决这个问题，因为js里面有一个天然的hash表结构就是对象。是一个典型的空间换时间的例子
    </Fragment>
  )
}
