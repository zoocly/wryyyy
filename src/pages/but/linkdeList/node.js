import _isEqual from 'lodash/isEqual';
class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}
export default class LinkedList {
  constructor() {
    this.count = 0; // 存储链表数量
    this.head = undefined; // 第一个元素
  }

  push(element) {
    const node = new Node(element);
    if(this.head === undefined){
      this.head = node;
    }else {
      let last = this.getElementAt(this.count);
      last.next = node;
    }
    this.count++;
  } // 向链表尾部添加一个新元素

  insert(element,position) {
    let node = new Node(element);
    let index = position - 1;
    let previous = this.getElementAt(index - 1);
    let next = previous.next;
    previous.next = node;
    node.next = next;
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
        let previous = this.getElementAt(p - 1);
        let last = previous.next;
        previous.next = last.next;
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
};

