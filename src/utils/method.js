
export function treeToList(data=[],delChild=false) {
  let resData=[];
  for(let obj of data){
    let child = obj.children;
    if(delChild){
      delete obj.children;
    }
    resData.push({...obj});
    if(child && child.length>0){
      resData=[...resData,...treeToList(child,delChild)]
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

export const uuid=()=> {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf("/") + 1);
};

