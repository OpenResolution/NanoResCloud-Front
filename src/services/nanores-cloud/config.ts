// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get user configs GET /api/config */
export async function getUserConfigs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserConfigsParams,
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

/** Edit a config PUT /api/config */
export async function editConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editConfigParams,
  options?: { [key: string]: any },
) {
  return request<API.ConfigItem>('/api/config', {
    method: 'PUT',
    params: {
      ...params,
      form_fields: undefined,
      ...params['form_fields'],
    },
    ...(options || {}),
  });
}

/** Create a new config POST /api/config */
export async function createConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createConfigParams,
  options?: { [key: string]: any },
) {
  return request<API.ConfigItem>('/api/config', {
    method: 'POST',
    params: {
      ...params,
      form_fields: undefined,
      ...params['form_fields'],
    },
    ...(options || {}),
  });
}

/** Delete configs DELETE /api/config */
export async function deleteConfigs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteConfigsParams,
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
