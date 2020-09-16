import _isEqual from 'lodash/isEqual';

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.prior = null;
  }
}
export default class LinkedList2 {
  constructor(){
    this.count = 0; // 存储链表数量
    this.head = null; // 第一个元素
    this.tail = null; // 最后一个元素
  }
  push(element) {
    const node = new Node(element);
    if(this.head === null){
      this.head = node;
      this.tail = node;
    }else {
      let last = this.tail;
      last.next = node;
      node.prior = last;
      this.tail = node;
    }
    this.count++;
  } // 向链表尾部添加一个新元素

  insert(element,position) {
    let node = new Node(element);
    let index = position - 1;
    let previous = this.getElementAt(index);
    let next = previous.next;

    previous.next = node;
    next.prior = node;
    node.prior = previous;
    node.next = next;
    this.count++;
  } // 向链表特定位置插入一个新元素

  getElementAt(index) {
    if(index >= 0 && index <= this.count){
      let node = this.head;
      if(index !== 0){
        for(let i = 0; i < index && node.next != null; i++){
          node = node.next;
        }
      }
      return node
    }else {
      return undefined;
    }
  } // 返回链表特定位置的元素

  remove(element) {
    let nodeIndex = this.indexOf(element);
    if(nodeIndex != -1){
      this.removeAt(nodeIndex+1);
    }else {
      console.warn('元素不存在');
    }
  } // 从链表中移除一个元素

  indexOf(element) {
    let node = this.head;
    for(let i = 0; i < this.count && node.next != null; i++){
      if(_isEqual(element,node.element)){
        return i;
      }
      node = node.next;
    }
    return -1;
  } // 返回元素在链表中的索引，没有则返回-1

  removeAt(position) {
    let p = position - 1;
    if(p >= 0 && p <= this.count){
      let node = this.head;
      if(p === 0){
        this.head = node.next;
      }else {
        // let previous = this.getElementAt(p - 1);
        // let last = previous.next;
        // previous.next = last.next;

        let now = this.getElementAt(p);
        let pre = now.prior;
        let next = now.next;

        pre.next = next;
        next.prior = pre;
      }
      this.count--;
    }else {
      return undefined;
    }
  } // 从链表特定位置移除一个元素
  isEmpty() {
    return this.count === 0
  } // 判断链表是否为空
  size() {
    return this.count;
  } // 返回链表包含的元素个数
  toString() {} // 返回整个链表的字符串
}
