// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function getUserConfigs(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.ConfigList>('/api/config/getUserConfigs', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
