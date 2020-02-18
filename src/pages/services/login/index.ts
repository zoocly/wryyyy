// @ts-ignore
import request from 'src/utils/request';
import qs from 'qs';
export function awsl(params:any) {
  console.log(params,'params');
  return request(`/api/awsl?${qs.stringify(params)}`);
}

export function getMenu(params:any) {
  return request(`/api/getMenu`,{
    method:'POST',
    body:params
  });
}
export function login(params:any) {
  return request(`/api/user/login?code=123`,{
    method:'POST',
    body:params
  });
}

export function getMemTotal(params:any) {
  console.log(params,'params')
  return request(`/api/chart/mem/getMemTotal`,{
    method:'POST',
    body:params
  });
}
export function getMemTotal2(params:any) {
  return request(`/api/chart/mem/getMemTotal2`,{
    method:'POST',
    body:params
  });
}
export function list(params:any) {
  return request(`/api/case/list`,{
    method:'POST',
    body:params
  });
}
