// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Get Configs GET /api/configs */
export async function getConfigs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getConfigsParams,
  options?: { [key: string]: any },
) {
  return request<API.ConfigItem[]>('/api/configs', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create Config POST /api/configs */
export async function createConfig(body: API.ConfigFields, options?: { [key: string]: any }) {
  return request<API.SuccessResponse>('/api/configs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Update Config PUT /api/configs/${param0} */
export async function updateConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateConfigParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.SuccessResponse>(`/api/configs/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Delete Config DELETE /api/configs/${param0} */
export async function deleteConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteConfigParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.SuccessResponse>(`/api/configs/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
