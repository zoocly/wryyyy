import _trim from 'lodash/trim';
export function treeToList(data=[]) {
  let resData=[];
  for(let obj of data){
    resData.push({...obj});
    if(obj.children && obj.children.length>0){
      resData=[...resData,...treeToList(obj.children,resData)]
    }
  }
  return resData;
}

export function jsonToTree(data=[], parent='parent', code='code',parentID='-1' ) {
  let result = [], temp,lastData=data;
  for (let i = 0; i < data.length; i++) {
    if (lastData[i][parent] === parentID) {
      let nextData=[...lastData].filter(obj=>obj[parent]!==lastData[i][parent]);
      let obj = Object.assign({},lastData[i]);
      temp = jsonToTree(nextData, parent, code, lastData[i][code]);
      if (temp.length > 0) {
        obj.children = temp;
      }
      result.push(obj);
    }
  }
  return result;
}

export const toChineseNum = (num) => {
  if(typeof num !== 'number'){
    return num;
  }
  let str, finalStr = '';
  let unitArr = ['','十','百','千','万'];
  let chineseNum = ['一','二','三','四','五','六','七','八','九'];
  str = JSON.stringify(num).split('').reverse();

  const wuWwei = (str) => {
    let _str = '';
    str.map((item, index)=> {
      if(item === '0'){
        _str = '零' + _str;
      }else {
        _str = chineseNum[item-1] + unitArr[index] + _str;
      }
    })
    return _str;
  };

  const baWei = (str) => {
    let _str = '';
    let last5wei = wuWwei(str.slice(0,4));
    let first = wuWwei(str.slice(4,str.length));
    return first + '万' + last5wei;
  };

  const up8Wwei = () => {
    let _str = '';
    let last8wei = baWei(str.slice(0,8));
    let first = wuWwei(str.slice(8,str.length));
    return first + '亿' + last8wei;
  };

  if(str.length <= 5){
    finalStr = wuWwei(str);
  }else if (str.length < 8){
    finalStr = baWei(str);
  }else if (str.length >= 8){
    finalStr = up8Wwei(str);
  }

  finalStr = finalStr.replace(/零[零十百千]+/g, '零')
                      .replace(/零+$/g, '')
                      .replace(/零万/g, '万')
                      .replace(/一十/g, '十');
  return finalStr.trim();
};

export const commafy = (num) => {
  if(typeof num !== 'number'){
    return num;
  }
  let arr = num.toString().split('.');
  let front = '';
  let back = '';
  if(num < 0){
    front = '0';
    back = arr.length === 2 ? arr[1] : '0';
  }else {
    back = arr.length === 2 ? arr[1] : '0';
    let _arr = arr[0].split('');
    for(let i = _arr.length - 3; i >0; i=i-3){
      _arr.splice(i,0,',');
    }
    front = _arr.join('');
  }
  return _trim(`${front}${back === '0' ? '': `.${back}`}`)
};
