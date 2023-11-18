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
  return request<API.ConfigList>('/api/config', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function createConfig(params: API.ConfigFormFields, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/config', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function deleteConfigs(
  params: {
    config_ids: string[];
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/config', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function editConfig(params: API.ConfigFormFields, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/config', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
