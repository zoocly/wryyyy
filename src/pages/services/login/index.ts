// @ts-ignore
import request from 'src/utils/request';
import qs from 'qs';
export function awsl(params:any) {
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
