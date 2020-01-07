// @ts-ignore
import request from 'src/utils/request';
import qs from 'qs';

export function getDictChartList(params:any) {
  return request(`/api/chart/getDictChartList?${qs.stringify(params)}`);
}

export function findByChartType(params:any) {
  return request(`/api/chart/findByChartType?${qs.stringify(params)}`);
}

export function saveChart(params:any) {
  return request(`/api/chart/saveChart`,{
    method:'POST',
    body:params
  });
}
