import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

export const config = {
  getResList:(res:any)=>{
    const {code = 500 ,data:{ records = [],total= 0, size = 10, current = 1 } = {}} = res;
    if(code != 0){
      return {};
    }
    return {
      resList: records,
      resPagination:{
        current,
        pageSize:size,
        total,
      }
    };
  },
  inputValue:(val:any)=>{
    let inputValue:Array<string> = [];
    if(!_isEmpty(val)){
      val.map((item:any)=>{
        inputValue.push(_get(item,`[name]`,''))
      })
    }
    return inputValue.toString()
  }
};
