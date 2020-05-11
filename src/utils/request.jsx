import {fetch} from 'dva';
import {ApiAuthError, ApiJsonError, ApiModuleError, ApiServerError,} from './errors';
import { history } from 'umi';
import {serviceError} from 'src/components/Notice';
function parseJSON(response) {
  return new Promise((resolve, reject) => {
    const Type=response.headers.get('Content-Type');
    if(Type && Type.includes('text/html')){
      response.text().then(text => {resolve(text);})
    }else{
      response
        .json()
        .then(json => {
          json._SERVER_URL = response.url;
          resolve(json);
        })
        .catch(error => {
          if (error instanceof SyntaxError) {
            reject(new ApiJsonError(response.url));
          } else {
            reject(error);
          }
        });
    }
  });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  let error;
  if (response.status === 401) {
    error = new ApiAuthError(response.url);
  } else if (response.status === 503) {
    error = new ApiModuleError(response.status, response.url);
  } else {
    error = new ApiServerError(response.status, response.url);
  }
  throw error;
}

function checkError(response) {
  // {
  //     statusCode: number,  // 200:success,300:error,500:warning
  //     message: string,     // u know
  //     data: {},            // 返回单个对象时，从该属性获取
  //     total: number,       // 返回列表时，总条数从该属性获取
  //     datas: []            // 返回列表时，列表数据从该属性获取
  // }
  if(typeof response == 'string'){
    return response
  }else{
    if (response.code !== 0) {
      const {code,_SERVER_URL}=response;
      let codeData=[1300,1100,1203,4002,400];//token认证失败 未登录 角色已过期
      if(`${_SERVER_URL}`.includes('/api/user/logout')){
        // 不弹出提示
      }else{
        if(codeData.includes(code)){
          sessionStorage.clear();
          localStorage.clear();
          history.push('/');
        }
        serviceError(response['message'],response['messageDetail']);
      }
    }
    return response;
  }
}

export default async function request(path, options, ...extend) {
  let url = path;
  const defaultOptions = {
    method: 'GET',
    credentials: 'include'
  };
  const Authorization = sessionStorage.getItem('authorization') || localStorage.getItem('authorization') || "";
  const {pathname,query}=window.location;
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method !== 'GET') {
    if (newOptions.body instanceof FormData) {
      newOptions.headers = {
        // 'Content-Type': 'multipart/form-data',
        ...newOptions.headers
      };
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers
      };
      newOptions.body = JSON.stringify(newOptions.body);
    }
  } else {
    // 增加时间戳 避免IE缓存 仅 GET
    const timestamp = new Date().getTime();
    if (url.indexOf('?') !== -1) {
      url += `&_=${timestamp}`;
    } else {
      url += `?_=${timestamp}`;
    }
  }
  newOptions.headers = {
    ...newOptions.headers,
    Authorization,
  };
  if (extend[0] === 'file') {
    return fetch(url, newOptions).then(res => res.blob()).then(blob => {
      let a = document.createElement('a');
      let url = window.URL.createObjectURL(blob);
      let filename = extend[1] || '新建文本文档.txt';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      return true;
    });
  }
  return Promise.race([
    fetch(url, newOptions)
      .then(checkStatus)
      .then(parseJSON)
      .then(checkError)
      .catch(err => {
        throw err;
      }),
  ]);
}
