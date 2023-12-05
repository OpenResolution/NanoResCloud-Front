// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Create Config POST /api/config/create_config */
export async function createConfig(options?: { [key: string]: any }) {
  return request<API.ConfigFormBackModels>('/api/config/create_config', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Get User Configs GET /api/config/getUserConfigs */
export async function getUserConfigs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserConfigsParams,
  options?: { [key: string]: any },
) {
  return request<API.GetConfigBackModels>('/api/config/getUserConfigs', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Update Config POST /api/config/update_config */
export async function updateConfig(options?: { [key: string]: any }) {
  return request<API.ConfigFormBackModels>('/api/config/update_config', {
    method: 'POST',
    ...(options || {}),
  });
}
